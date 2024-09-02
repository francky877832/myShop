const   GiftHistory = require('../models/giftHistoryModel');

const mongoose = require('mongoose');


// Ajouter une transaction de cadeau pour un utilisateur
exports.addGift = async (req, res) => {
    const { userId, reward, pointsSpent } = req.body;

    try {
        const giftEntry = new GiftHistory({
            user: userId,
            reward,
            pointsSpent
        });

        await giftEntry.save();

        res.status(201).json({ message: "Cadeau ajouté avec succès", data: giftEntry });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du cadeau', error });
    }
};

exports.getUserGiftHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const giftHistory = await GiftHistory.find({ user: userId }).sort({ date: -1 });

        if (!giftHistory.length) {
            return res.status(404).json({ message: "Aucun historique de cadeaux trouvé pour cet utilisateur." });
        }

        res.status(200).json(giftHistory);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des cadeaux", error });
    }
};


  
  
  