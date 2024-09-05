const mongoose = require('../../shared/db').mongoose;

const Basket = require('../models/basketModel');
const Product = require('../models/productModel');
const ObjectId = mongoose.Types.ObjectId;

const addBasketProduct = (req, res, next) => {

    const basket = new Basket({
        user : req.params.user,
        username : req.body.username,
        products : new Array(req.body.product)
    })
    basket.save()
    .then( () => {
        res.status(200).json({ message: "Produit ajouter au basket avec succes." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};



exports.updateBasketProduct = async (req, res, next) => {
    console.log(req.body);

    try {
        const baskets = await Basket.find({ user: req.params.user });

        let isProductPresent = false;

        if (baskets.length > 0) {
            for (let el of baskets[0].products) {
                if (el == req.body.product) {
                    isProductPresent = true;
                    break;
                }
            }

            if (!isProductPresent) {
                let bask = baskets;
                bask[0].products.push(req.body.product);

                try {
                    await Basket.updateOne({ user: req.params.user }, { products: bask[0].products });

                    await Product.findOneAndUpdate(
                        { _id: req.body.product },
                        { $inc: { inBasket: 1 } },
                        { new: true }
                    );

                    res.status(200).json({ message: "Nouveau Produit ajouté au panier pour cet utilisateur." });
                } catch (error) {
                    res.status(400).json({ error });
                }
            } else {
                res.status(200).json({ message: "Ce produit est déjà dans votre panier." });
            }
        } else {
            addBasketProduct(req, res, next);
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};



exports.removeBasketProduct = async (req, res, next) => {
    try {
        const baskets = await Basket.find({ user: req.params.user });

        let newBasket = [];
        for (let i in baskets[0].products) {
            let el = baskets[0].products[i];
            if (el != req.body.product) {
                newBasket.push(el);
            }
        }

        try {
            await Basket.updateOne({ user: req.params.user }, { products: newBasket });

            await Product.findOneAndUpdate(
                { _id: req.body.product },
                { $inc: { inBasket: -1 } },
                { new: true }
            );

            res.status(200).json({ message: 'Product removed from user basket.' });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


exports.getBasketProducts = async (req, res, next) => {
  
    const userId = req.params.user
    try {
        const basketAggregation = await Basket.aggregate([
            // Étape 1 : Filtrer le panier par userId
            { 
                $match: { user: new ObjectId(userId) } 
            },
            // Étape 2 : Décomposer le tableau de produits
            { 
                $unwind: '$products' 
            },
            // Étape 3 : Récupérer les détails des produits
            {
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            // Étape 4 : Décomposer le tableau de productDetails pour un traitement plus approfondi
            { 
                $unwind: '$productDetails' 
            },
            // Étape 5 : Récupérer les informations du vendeur et ses abonnés
            {
                $lookup: {
                    from: 'users',
                    localField: 'productDetails.seller',
                    foreignField: '_id',
                    as: 'sellerDetails'
                }
            },
            // Étape 6 : Récupérer les favoris associés au produit
            {
                $lookup: {
                    from: 'users',
                    localField: 'productDetails.favourites',
                    foreignField: '_id',
                    as: 'favouritesDetails'
                }
            },
            // Étape 7 : Récupérer les commentaires associés au produit
            {
                $lookup: {
                    from: 'comments',
                    localField: 'productDetails._id',
                    foreignField: 'product',
                    as: 'comments'
                }
            },
            // Étape 8 : Remplacer le champ user dans les commentaires par ses informations détaillées
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user',
                    foreignField: '_id',
                    as: 'commentUserDetails'
                }
            },
            {
                $addFields: {
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                $mergeObjects: [
                                    '$$comment',
                                    { user: { $arrayElemAt: ['$commentUserDetails', 0] } }
                                ]
                            }
                        }
                    }
                }
            },
            // Étape 9 : Remplacer le champ user dans les subComments par ses informations détaillées
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.subComment.user',
                    foreignField: '_id',
                    as: 'subCommentUserDetails'
                }
            },
            {
                $addFields: {
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                $mergeObjects: [
                                    '$$comment',
                                    {
                                        subComment: {
                                            $map: {
                                                input: '$$comment.subComment',
                                                as: 'subComment',
                                                in: {
                                                    $mergeObjects: [
                                                        '$$subComment',
                                                        { user: { $arrayElemAt: ['$subCommentUserDetails', 0] } }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            // Étape 10 : Regrouper les informations pour reconstruire la structure du panier
            {
                $group: {
                    _id: '$_id',
                    user: { $first: '$user' },
                    username: { $first: '$username' },
                    products: { $push: '$products' },
                    productDetails: {
                        $push: {
                            $mergeObjects: [
                                '$productDetails',
                                { 
                                    seller: { $arrayElemAt: ['$sellerDetails', 0] } 
                                },
                                { 
                                    favourites: '$favouritesDetails' 
                                },
                                {
                                    comments: '$comments' // Ajouter les commentaires modifiés
                                }
                            ]
                        }
                    }
                }
            }
        ]);
    
        if (basketAggregation.length === 0) {
            console.log("Basket not found")
            return res.status(200).json({ productDetails : [] });
        }
    
        //console.log(basketAggregation[0]);
        res.status(200).json(basketAggregation[0]);
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error })
    }
    
}


