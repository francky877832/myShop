const mongoose = require('../../shared/db').mongoose;

const Basket = require('../models/basketModel');
const Product = require('../models/productModel');
const { getPipeLineForavouritesAndBasket } = require('./pipelinesForControllers')
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
  

    try
    {
        const userId = req.params.user
     
      const pipeline = getPipeLineForavouritesAndBasket(userId)
      const basketProduct = await Basket.aggregate(pipeline).exec();
      
  
          //const totalDatas = basketProduct[0].productDetails?.length
          if(basketProduct.length > 0)
          {
            basketProduct[0]?.productDetails.reverse()
            res.status(200).json(basketProduct[0]);
          }
          else
          {
            res.status(200).json({});
          }
            
        
  
        }catch(error) { 
              console.log(error)
              res.status(400).json({ error: error });
        }
    
}


