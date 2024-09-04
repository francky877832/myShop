const PointsHistory = require('../models/pointsHistoryModel');

const mongoose = require('mongoose');

exports.getMonthlyLeaderboard = async (req, res) => {
    const { month } = req.query;
  
    // Définir le début et la fin du mois sélectionné
    const startOfMonth = new Date(month);
    startOfMonth.setHours(0, 0, 0, 0); // Pour être sûr de commencer au début du jour
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
  
    try {
        const leaderboard = await PointsHistory.aggregate([
            {
                $unwind: "$pointsHistory" // Séparer chaque élément du tableau pointsHistory
            },
           /*{
                $match: {
                    "pointsHistory.date": {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    }
                }
            },*/
            {
                $group: {
                    _id: "$user",
                    points: { $sum: "$pointsHistory.points" },
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id", // Utilisation de l'ID de l'utilisateur (résultat du group)
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $sort: { points: -1 }
            },
           
        ]);

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du classement', error });
    }
};


  // Récupérer l'historique des points d'un utilisateur
exports.getUserPointsHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const pointsHistory = await PointsHistory.findOne({ user: userId }).sort({ 'pointsHistory.date': -1 });

        if (!pointsHistory) {
            return res.status(404).json({ message: "Aucun historique de points trouvé pour cet utilisateur." });
        }

        res.status(200).json(pointsHistory.pointsHistory);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des points", error });
    }
};



// Ajouter une nouvelle entrée dans l'historique des points d'un utilisateur
exports.addPointsHistory = async (req, res) => {
    const { userId, points, reason } = req.body;

    try {
        let pointsHistory = await PointsHistory.findOne({ user: userId });

        if (!pointsHistory) {
            // Si aucun historique n'existe pour cet utilisateur, créer un nouvel enregistrement
            pointsHistory = new PointsHistory({
                user: userId,
                pointsHistory: [{ points, reason }]
            });
        } else {
            // Sinon, ajouter une nouvelle entrée dans le tableau pointsHistory
            pointsHistory.pointsHistory.push({ points, reason });
        }

        await pointsHistory.save();

        res.status(201).json({ message: "Historique des points mis à jour avec succès", data: pointsHistory });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout à l'historique des points", error });
    }
};








  
  
  
  