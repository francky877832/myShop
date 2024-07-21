const Offer = require('../models/offerModel');
const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;

exports.respondOfferProduct = (req, res, next) => {
    Offer.find({ seller : offer.seller, buyer : offer.buyer, product : offer.product})
    .then( (offers) => {
        console.log(offers)
        res.status(200).json(offers);
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
}

exports.getOffersProduct = (req, res, next) => {
    //console.log("ok")
    //console.log("ggg")
    const offer = req.query
    Offer.find({ seller : offer.seller, buyer : offer.buyer, product : offer.product})
    .then( (offers) => {
        //console.log(offers)
        res.status(200).json(offers);
    })
    .catch( (error) => {
        //console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
};

addOfferProduct = (req, res, next) => {
    //console.log("ggg")
    //console.log(req.body)
    const offer = new Offer({
        _id : new ObjectId(),
        seller : req.body.seller,
        buyer : req.body.buyer,
        product : req.body.product,
        realPrice : req.body.realPrice,
        offers : [...req.body.offers],
        //hasGotResponse : req.body.hasGotResponse
    })
    offer.save()
    .then( () => {
        res.status(200).json({ message: "Offre ajoute avec succes pour ce produit" });
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
};

exports.updateOfferProduct = (req, res, next) => {
    //console.log(req.body)
    Offer.find({ seller : req.body.seller, buyer : req.body.buyer,  product : req.body.product})
    .then( (offer) => {
        if(offer.length > 0)
        {
            //console.log("error")
            offer[0].offers.push({_id : new ObjectId(), ...req.body.offers})
            console.log(offer[0].offers)
            Offer.updateOne({ seller : req.body.seller, buyer : req.body.buyer,  product : req.body.product}, {offers : offer[0].offers})
            .then( () => {
                    res.status(200).json({ message: "Nouvelle offre placee avec succes pour ce produit et ces deux users.", offers : offer[0].offers});
                })
            .catch( (error) => {
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
        //console.log(error)
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
};

exports.removeOfferPriceProduct = (req, res, next) => {

    Offer.find({ _id : req.params.id })
    .then( (offer) => {
        console.log(offer[0].offers)
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







