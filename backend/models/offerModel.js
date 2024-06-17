const mongoose = require('mongoose');
const Schema = mongoose.Schema

const offerSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    realPrice: { type: Numner, required: true },
    offerPrice: { type: Number, required : true },

    hasGotRespond : { type: Number, enum : [0, 1, 2], required : true },

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);
