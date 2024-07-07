const Favourite = require('../models/favouriteModel');


exports.getUserLikedProducts  = (req, res, next) => {
    Favourite.find({ user : req.params.user })
        .then( (favourites) => { 
            res.status(200).json(favourites);
        })
        .catch( (error) => { 
            res.status(400).json({ error: error });
        });
};

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
                    if(el._id == req.body.product._id)
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
    Favourite.find({ user : req.params.user })
    .then( (fav) => {
        let newFav = []
        for (let i in fav[0].products)
        {
            let el = fav[0].products[i]
            if(el._id != req.body.product._id)
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





