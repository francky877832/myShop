const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const appName = "TheStyle"

const pointsHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pointsHistory : [{   
        _id : { type: Schema.Types.ObjectId, required: true },
        points: {type: Number, required: true},
        reason: { type: String, required: true},
        date: {type: Date, default: Date.now }
    }],
    
}, {
    timestamps: true // Pour avoir createdAt et updatedAt automatiquement
});

pointsHistorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('PointsHistory', pointsHistorySchema);



