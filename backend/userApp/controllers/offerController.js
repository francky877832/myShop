const Offer = require('../models/offerModel');
const Product = require('../models/productModel');
const mongoose = require('../../shared/db').mongoose;
const { getPipeLineForOffers } = require('./pipelinesForControllers')

const ObjectId = mongoose.Types.ObjectId;

exports.respondOfferProduct = (req, res, next) => {
    console.log(req.body)
    const offer = req.body
    Offer.find({ seller : offer.seller, buyer : offer.buyer, product : offer.product})
    .then( (offers) => {
        //console.log(offers)
        offers[0].offers.at(-1).hasGotResponse = offer.hasGotResponse
        Offer.updateOne({ seller : offer.seller, buyer : offer.buyer, product : offer.product}, {offers:offers[0].offers})
        .then(async () => {
            //console.log("p")
            //await Product.findByIdAndUpdate(offer.product, {offersPrice:offers[0].offers.at(-1).price})
            res.status(200).json({message : "Reponse mise a jour pour l'offre."});
        }).catch( (error) => {
            console.log(error)
            res.status(400).json({ error: error, message : "Erreur lors de la mise a jour pour l'offre. " });
        });
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
}



const addOfferProduct = (req, res, next) => {
   
   // console.log(req.body)
    const offer = new Offer({
        seller : req.body.seller,
        buyer : req.body.buyer,
        product : req.body.product,
        realPrice : req.body.realPrice,
        offers : new Array({_id : new ObjectId().toHexString(), ...req.body.offers}),
        //hasGotResponse : req.body.hasGotResponse
    })
    //console.log("ggg")
    offer.save()
    .then( () => {
        //console.log("good")
        res.status(200).json({ message: "Offre ajoute avec succes pour ce produit" });
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
};

exports.updateOfferProduct = (req, res, next) => {
    console.log(req.body)
    Offer.find({ seller : req.body.seller, buyer : req.body.buyer,  product : req.body.product})
    .then( (offer) => {
        if(offer.length > 0)
        {
            //console.log("error")
            offer[0].offers.push({_id : new ObjectId().toHexString(), ...req.body.offers})
            //console.log(offer[0].offers)
            Offer.updateOne({ seller : req.body.seller, buyer : req.body.buyer,  product : req.body.product}, {offers : offer[0].offers})
            .then( () => {
                    res.status(200).json({ message: "Nouvelle offre placee avec succes pour ce produit et ces deux users.", offers : offer[0].offers});
                })
            .catch( (error) => {
                    console.log(error)
                    res.status(400).json({ error: error });
                });
        }
        else
        {
            //console.log("error else")
            addOfferProduct(req, res, next)
        }
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
};

exports.removeOfferPriceProduct = (req, res, next) => {

    Offer.find({ _id : req.params.id })
    .then( (offer) => {
        //console.log(offer[0].offers)
        for(let i in offer[0].offers)
        {
            if(offer[0].offers[i] != null)
            {
                if(offer[0].offers[i]._id == req.body.id)
                {
                    offer[0].offers.splice(i, 1);
                    break;
                }
            }
           
        }
        
        Offer.updateOne({ _id : req.params.id }, {offers : offer[0].offers})
        .then( () => {
                res.status(200).json({ message: "Offre supprime pour ce produit et ces deux users."});
            })
        .catch( (error) => {
                res.status(400).json({ error: error });
            });
    })
    .catch( (error) => {
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
};


exports.getOffersProduct = async (req, res, next) => {
    try
    {
    //console.log("ok")
        const offer = req.query
        //console.log(offer)
        const match = {
            seller: new mongoose.Types.ObjectId(offer.seller),
            buyer: new mongoose.Types.ObjectId(offer.buyer),
            product: new mongoose.Types.ObjectId(offer.product),
        }
        const pipeline = getPipeLineForOffers(match)
        const offersWithProduct = await Offer.aggregate(pipeline).exec();
        //res.status(200).json(offersWithProduct);
        //console.log(offersWithProduct)
        /*if(offersWithProduct.length===0)
        {
            res.status(404).json({message : "Cette offre nexiste pas entre ces deux users." });
        }*/
        res.status(200).json({...offersWithProduct[0]});

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    };
};


exports.getUserOffers = async (req, res, next) => {
    //console.log("OFFERS")
    const offer = req.query
    console.log(req.query)
    const page = parseInt(offer.page) || 1;
    const limit = parseInt(offer.limit) || 100;
    const skip = (page - 1) * limit;
    try 
    {
        const match = {$or:[{ seller : new mongoose.Types.ObjectId(offer.user)}, {buyer :  new mongoose.Types.ObjectId(offer.user)}]}
        const pipeline = getPipeLineForOffers(match, skip, limit)
        const offers = await Offer.aggregate(pipeline).exec();
        
            //console.log(offers)
            const totalDatas = await Offer.countDocuments({$or:[{ seller :  new mongoose.Types.ObjectId(offer.user), buyer :  new mongoose.Types.ObjectId(offer.user)}]}).exec();
            const totalPages = Math.ceil(totalDatas / limit);
            res.status(200).json({offers:offers, page:page,totalPages:totalPages,totalDatas:totalDatas});

    }catch(error){
        console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas pour cet user." });
    }
};


exports.updateOfferRead = (req, res, next) => {
    const offer = req.body
    console.log(offer)
    Offer.updateOne({ seller : offer.seller, buyer : offer.buyer, product:offer.product}, {read:1})
    .then(() => {
        res.status(200).json({ message: "Notification marquée comme lue." });
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({ error: error.message });
    });
}







