const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema


const groupOrderSchema = new  Schema({

        no : { type: String, required : true, default : 0 },
        read : { type: Number, enum : [0, 1], default : 0, required : true },
        status: {type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
        paymentStatus : {type: String, enum: ['payment_pending', 'payment_successful', 'payment_failed'], default:'payment_pending'},
        phone: { type: String },
        orderPhone : { type: String },
        shippingAddress: {
            quater: { type: String },
            city: { type: String },
            country: { type: String, default:'Cameroon' },
            title: { type: String }
        },

        totalPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },

        paymentMethod : {type: String, enum: ['campay',], default:'campay', require:true},
        paymentDetails : {type: String, enum: ['orange', 'mtn'] }, //require:true

                    
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
