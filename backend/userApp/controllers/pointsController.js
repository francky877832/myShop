const PointsHistory = require('../models/pointsHistoryModel');

const mongoose = require('mongoose');


exports.getMonthlyLeaderboard = async (req, res) => {
    const { month } = req.query;
  
    const startOfMonth = new Date(month);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
  
    try {
        const leaderboard = await PointsHistory.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    }
                }
            },
            {
                $group: {
                    _id: "$user",
                    total_points: { $sum: "$points" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $sort: { total_points: -1 }
            }
        ]);
  
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du classement', error });
    }
  };

  exports.getUserPointsHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        // Rechercher tous les enregistrements de points pour cet utilisateur
        const pointsHistory = await PointsHistory.find({ user: userId }).sort({ date: -1 });

        if (!pointsHistory.length) {
            return res.status(404).json({ message: "Aucun historique de points trouvé pour cet utilisateur." });
        }

        res.status(200).json(pointsHistory);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des points", error });
    }
};

exports.addPoints = async (req, res) => {
    const { userId, points, reason } = req.body;

    try {
        const now = new Date();

        const existingEntry = await PointsHistory.findOne({
            user: userId,
        });

        if (existingEntry) {
            existingEntry.points += points;
            await existingEntry.save();
            res.status(200).json({ message: "Points ajoutés avec succès", data: existingEntry });
        } else {
            const newEntry = new PointsHistory({
                user: userId,
                points,
                reason,
                date: now
            });
            await newEntry.save();
            res.status(201).json({ message: "Points ajoutés avec succès", data: newEntry });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout des points', error });
    }
};

  
  
  
  