const express = require('express');
const router = express.Router();

const offerCtrl = require('../controllers/offerController');


//Offer routes
router.post('/offer/add', offerCtrl.addOfferProduct);
router.get('/offer/get', offerCtrl.getOffersProduct);
    //Ces deux id sont difference
router.put('/offer/update/:id', offerCtrl.updateOfferProduct); //pour ajouter un prix
router.put('/offer/remove/price/:id', offerCtrl.removeOfferPriceProduct); //pour supprimer un prix


module.exports = router;