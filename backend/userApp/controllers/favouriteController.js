const Favourite = require('../models/favouriteModel');


exports.getUserLikedProducts  = (req, res, next) => {
    Favourite.find({ user : req.body.user })
        .then( (favourites) => { 
            res.status(200).json(favourites);
        })
        .catch( (error) => { 
            res.status(400).json({ error: error });
        });
};

exports.addUserLikedProducts = (req, res, next) => {
    const favourite = new Favourite(
    {
        user : req.body.user,
        products : [{ product : req.body.product }]
    })
    favourite.save()
            .then(
                () => {
                    res.status(200).json({message : "Favoris utilisateur ajoutee avec succes."});
                })
            .catch((error) => { 
                res.status(400).json({error : error}); 
            })
}

exports.updateUserLikedProducts  = (req, res, next) => {
    Favourite.find({ user : req.body.user })
    .then(
        (favourites) => 
        {
            let isFavPresent = false
            for(let el of favourites[0].products)
            {
                if(el.product == req.body.product)
                {
                    isFavPresent = true;
                    break; 
                }
            }
            
            if(!isFavPresent)
            {
                let fav = favourites
                fav[0].products.push({product : req.body.product})
                Favourite.updateOne({ user : req.body.user },  { products : fav[0].products })
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

              
        })
        .catch((error) => { res.status(400).json({error : error}); });
  };


exports.removeUserLikesProduct  = (req, res, next) => {
    Favourite.find({ user : req.body.user })
    .then( (fav) => {
        let newFav = []
        for (let i in fav[0].products)
        {
            let el = fav[0].products[i]
            if(el.product != req.body.product)
            {
               newFav.push(fav[0].products[i] )
            }
        }
        Favourite.updateOne({ user : req.body.user },  { products : newFav })
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





