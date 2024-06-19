const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const orderSchema = new  Schema({
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }], //Un docu pour par order et non par user
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
    shippingAddress: {
        street: { type: String },
        city: { type: String, required : true },
        country: { type: String, required : true, default : "Cameroun" }
    },
    createdAt : { type : Date, default : Date.now() },
    updatedAt : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('Order', orderSchema);
