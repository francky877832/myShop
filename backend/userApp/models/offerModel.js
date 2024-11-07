const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

// hasGotResponse 0.refuse 1.valide 2.en attente
const offerSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    realPrice: { type: Number, required: true },
    offers : [{
        _id : { type: Schema.Types.ObjectId, required: true },
        from : { type: Schema.Types.String, required: true },
        hasGotResponse : { type: Number, enum : [0, 1, 2], default : 2, required : true },
        price : { type : Number, required : true },
    }],
    read : { type: Number, enum : [0, 1], default : 0, required : true },
    validity : {type : Date, default : Date.now() + 3600*24*1000 },
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

offerSchema.index({ seller: 1, buyer: 1, product : 1 }, { unique: true });


module.exports = mongoose.model('Offer', offerSchema);
