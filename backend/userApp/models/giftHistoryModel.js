const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rewardsHistory :[{
        reward: {
            type: String,
            enum: ['reduction'],
            required: true
        },
        pointsSpent: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true // Pour avoir createdAt et updatedAt automatiquement
});

module.exports = mongoose.model('GiftHistory', giftHistorySchema);
