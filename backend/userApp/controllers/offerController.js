const Offer = require('../models/offerModel');



exports.getOffersProduct = (req, res, next) => {

    Offer.find({ seller : req.body.seller, buyer : req.body.buyer, product : req.body.product})
    .then( (offer) => {
        res.status(200).json(offer);
    })
    .catch( (error) => {
        res.status(400).json({ error: error, message : "Cette offre nexiste pas entre ces deux users." });
    });
};

exports.addOfferProduct = (req, res, next) => {

    const offer = new Offer({
        seller : req.body.seller,
        buyer : req.body.buyer,
        product : req.body.product,
        realPrice : req.body.realPrice,
        offers : [{ offerPrice : req.body.offerPrice, from : req.body.from }],
        hasGotResponse : req.body.response
    })
    offer.save()
    .then( () => {
        res.status(200).json({ message: "Offre ajoute avec succes pour ce produit" });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};

exports.updateOfferProduct = (req, res, next) => {

    Offer.find({ _id : req.params.id })
    .then( (offer) => {
        offer[0].offers.push({offerPrice : req.body.offerPrice, from : req.body.from})
        console.log(offer[0].offers)
        Offer.updateOne({ _id : req.params.id }, {offers : offer[0].offers})
        .then( () => {
                res.status(200).json({ message: "Nouvelle offre placee avec succes pour ce produit et ces deux users.", offers : offer[0].offers});
            })
        .catch( (error) => {
                res.status(400).json({ error: error });
            });
    })
    .catch( (error) => {
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







