const Basket = require('../models/basketModel');


exports.addBasketProduct = (req, res, next) => {

    const basket = new Basket({
        user : req.body.user,
        products : req.body.products,
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
            for(let el of baskets[0].products)
            {
                if(el.product == req.body.products[0].product)
                {
                    isProductPresent = true;
                    break; 
                }
            }
            if(!isProductPresent)
            {
                baskets[0].products.push({product : req.body.products[0].product})
                console.log("ok")
                Basket.updateOne({ user : req.params.user },  { products : baskets[0].products })
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
    Basket.find({ user : req.body.user })
    .then( (products) => {
        res.status(200).json(products);
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};


