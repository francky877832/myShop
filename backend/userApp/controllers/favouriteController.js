const mongoose = require('../../shared/db').mongoose;

const Favourite = require('../models/favouriteModel');

const ObjectId = mongoose.Types.ObjectId;
exports.getUserLikedProducts  =  (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 100; // Nombre d'éléments par page, par défaut 20
    const skip = (page - 1) * limit;
    const userId = req.params.user
    console.log(userId)
    Favourite.aggregate([
        { $match: { user: new ObjectId(userId) } }, 
        { $unwind: '$products' }, // Décompose le tableau de produits likés
        {
          $lookup: {
            from: 'products',
            localField: 'products',
            foreignField: '_id',
            as: 'productDetails'
          }
        },
        { $unwind: '$productDetails' }, // Décompose le tableau résultant de la jointure
        {
          $lookup: {
            from: 'users',
            localField: 'productDetails.favourites',
            foreignField: '_id',
            as: 'favouriteUserDetails'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'productDetails.seller',
            foreignField: '_id',
            as: 'sellerDetails'
          }
        },
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
                  { favourites: '$favouriteUserDetails' }, // Remplacer les IDs par les objets utilisateur complets pour les favoris
                  { seller: { $arrayElemAt: ['$sellerDetails', 0] } } // Remplacer l'ID du vendeur par l'objet utilisateur complet
                ]
              }
            }
          }
        }
      ]).then(async (favourites) => { 
            console.log("AGG")
            console.log(favourites[0].productDetails)
            console.log("END")
            //res.status(200).json(favourites);
            /*if(favourites.length <= 0)
            {
                throw new Error('No-favourite-found')
            }*/
            const totalDatas = await Favourite.countDocuments({ user: new ObjectId(userId) }).exec();
            const totalPages = Math.ceil(totalDatas / limit);
            favourites[0]?.productDetails.reverse()
            res.status(200).json({datas:favourites.slice(skip, skip+limit), page:page,totalPages:totalPages,totalDatas:totalDatas});

        })
        .catch( (error) => { 
            console.log(error)
            res.status(400).json({ error: error });
        });
    }

const addUserLikedProducts = (req, res, next) => {
    console.log("ADD FIRST TIME")
    
    const favourite = new Favourite(
    {
        user : req.params.user,
        username : req.body.username,
        products : new Array(req.body.product)
    })
    favourite.save()
            .then(
                () => {
                    res.status(200).json({message : "Favoris utilisateur ajoutee avec succes."});
                })
            .catch((error) => { 
                console.log(error)
                res.status(400).json({error : error}); 
            })
}

exports.updateUserLikedProducts  = (req, res, next) => {
    
    Favourite.find({ user : req.params.user })
    .then(
        (favourites) => 
        {
            let isFavPresent = false
            if(favourites.length > 0)
            {
                for(let el of favourites[0].products)
                {
                    if(el == req.body.product)
                    {
                        isFavPresent = true;
                        break; 
                    }
                }
                
                if(!isFavPresent)
                {
                    let fav = favourites
                    fav[0].products.push(req.body.product)
                    Favourite.updateOne({ user : req.params.user },  { products : fav[0].products })
                        .then(
                            () => {
                                res.status(200).json({message : "Produit ajoute a la liste des favoris de cet user."});
                        })
                        .catch((error) => { res.status(400).json({error : error}); });     
                }
                else
                {
                    res.status(200).json({message : "Ce produit existe deja dans les favoris de cet user."});
                }
            }
            else
            {
                //console.log("OKK")
                
                addUserLikedProducts(req, res, next)
            }

              
        })
        .catch((error) => { console.log(error);res.status(400).json({error : error}); });
  };


exports.removeUserLikesProduct  = (req, res, next) => {
    //console.log("GOMAN")
    Favourite.find({ user : new ObjectId(req.params.user) })
    .then( (fav) => {
        let newFav = []
        for (let i in fav[0].products)
        {
            let el = fav[0].products[i]
            if(el != req.body.product)
            {
               newFav.push(fav[0].products[i] )
            }
        }
        
        Favourite.updateOne({ user : req.params.user },  { products : newFav })
                    .then(
                        () => {
                            res.status(200).json({ message: 'Product removed from user favourite list.'});
                        })
                    .catch((error) => { res.status(400).json({error : error}); }); 
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };





