const mongoose = require('mongoose');
const Schema = mongoose.Schema

const discountSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required : true },
    value : { type: Number, required : true },
    category : [{ type : Schema.Types.ObjectId, ref : 'Category', required : true  }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
    expiredAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Discount', discountSchema);
