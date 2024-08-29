const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema


const groupOrderSchema = new  Schema({

        no : { type: String, required : true, default : 0 },
        read : { type: Number, enum : [0, 1], default : 0, required : true },
        status: {type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
        phone: { type: String },
        shippingAddress: {
            street: { type: String, required : false },
            city: { type: String, required : true },
            title: { type: String, required : true },
            country: { type: String, required : true, default : "Cameroon" }
        },

        totalPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },

                    
        createdAt : { type : Date, default : Date.now },
        updatedAt : { type : Date, default : Date.now },
});

groupOrderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

groupOrderSchema.pre('updateOne', { document: true, query: false }, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('GroupOrder', groupOrderSchema);
