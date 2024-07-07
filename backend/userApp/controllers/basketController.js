const mongoose = require('../../shared/db').mongoose;

const Basket = require('../models/basketModel');

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


exports.updateBasketProduct = (req, res, next) => {
    Basket.find({ user : req.params.user })
    .then((baskets) => {
        
            let isProductPresent = false
            if(baskets.length > 0)
            {
                for(let el of baskets[0].products)
                {
                    if(el._id == req.body.product._id)
                    {
                        isProductPresent = true;
                        break; 
                    }
                }
                if(!isProductPresent)
                {
                    let bask = baskets
                    bask[0].products.push(req.body.product)
                    
                    Basket.updateOne({ user : req.params.user },  { products : bask[0].products })
                        .then(
                            () => {
                                res.status(200).json({message : "Nouveau Produit ajouter au panier pour cet user."});
                        })
                        .catch((error) => { res.status(400).json({error : error}); });     
                }
                else
                {
                    res.status(200).json({message : "Ce produt est deja dans votre panier."});
                }
            }else{
                addBasketProduct(req, res, next)
            }

              
        })
        .catch((error) => { res.status(400).json({error : error}); });
}

exports.removeBasketProduct  = (req, res, next) => {
    Basket.find({ user : req.params.user })
    .then( (baskets) => {
        let newBasket = []
        for (let i in baskets[0].products)
        {
            let el = baskets[0].products[i]
            if(el.product != req.body.products[0].product)
            {
               newBasket.push(baskets[0].products[i] )
            }
        }
        Basket.updateOne({ user : req.params.user },  { products : newBasket })
            .then(() => {
                    res.status(200).json({ message: 'Product removed from user basket.'});
            })
            .catch((error) => { res.status(400).json({error : error}); }); 
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };


exports.getBasketProducts = (req, res, next) => {
  
    const userId = req.params.user
        Basket.aggregate([
            //{ $match: { user: new ObjectId(userId) } }, 
            { $unwind: '$products' }, // Décompose le tableau de user_ids
            {
              $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: '_id',
                as: 'productDetails'
              }
            },
            /*{
                $unwind: {
                  path: '$productDetails',
                  preserveNullAndEmptyArrays: true // Préserve les documents même si le tableau est vide ou n'a qu'un seul élément
                }
            },*/
            { $unwind: '$productDetails' },
            {
              $group: {
                _id: '$_id',
                user: { $first: '$user' },
                username: { $first: '$username' },
                products: { $push: '$products' },
                productDetails : { $push: '$productDetails' }
              }
            }
           
        ]).then( (basket) => { 
            console.log("AGG")
                console.log(basket)
            res.status(200).json(basket);
        })
        .catch( (error) => { 
            console.log(error)
            res.status(400).json({ error: error });
        });
    }


