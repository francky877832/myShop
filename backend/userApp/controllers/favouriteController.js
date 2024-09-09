const mongoose = require('../../shared/db').mongoose;

const Favourite = require('../models/favouriteModel');
const { getPipeLineForavouritesAndBasket } = require('./pipelinesForControllers')

const ObjectId = mongoose.Types.ObjectId;
exports.getUserLikedProducts  =  async (req, res, next) => {

  try
  {
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 100; // Nombre d'éléments par page, par défaut 20
    const skip = (page - 1) * limit;
    const userId = req.params.user
    console.log(userId)
   
    const pipeline = getPipeLineForavouritesAndBasket(userId, skip, limit, { sold:1, visibility:-1, _id: -1 })
    const favourites = await Favourite.aggregate(pipeline).exec();
    

        const totalDatas = favourites[0].productDetails.length
        const totalPages = Math.ceil(totalDatas / limit);
        favourites[0]?.productDetails.reverse()
        res.status(200).json({datas:favourites.slice(skip, skip+limit), page:page,totalPages:totalPages,totalDatas:totalDatas});

      }catch(error) { 
            console.log(error)
            res.status(400).json({ error: error });
      }
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





