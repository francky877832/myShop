const   GiftHistory = require('../models/giftHistoryModel');

const mongoose = require('mongoose');


exports.addGift = async (req, res) => {
    const { userId, reward, pointsSpent } = req.body;

    try {
        const giftEntry = await GiftHistory.findOneAndUpdate(
            { user: userId },
            {
                $push: {
                    rewardsHistory: {
                        reward,
                        pointsSpent,
                    }
                }
            },
            { new: true, upsert: true } // Crée un nouveau document si aucun n'existe pour cet utilisateur
        );

        res.status(201).json({ message: "Cadeau ajouté avec succès", data: giftEntry });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du cadeau', error });
    }
};


exports.getUserGiftHistory = async (req, res) => {
    const { userId } = req.params;
    //console.log(userId)

    try {
        const giftHistory = await GiftHistory.findOne({ user: userId })
            //.select('rewardsHistory')
            .sort({ 'rewardsHistory.date': -1 });

        if (!giftHistory || !giftHistory.rewardsHistory.length) {
            return res.status(404).json({ message: "Aucun historique de cadeaux trouvé pour cet utilisateur." });
        }

        res.status(200).json(giftHistory.rewardsHistory);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des cadeaux", error });
    }
};



  
  
  