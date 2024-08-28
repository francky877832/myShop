const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const orderSchema = new  Schema({
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
                {
                    _id : { type: Schema.Types.ObjectId, required: true },
                    product : {type: Schema.Types.ObjectId, ref: 'Product', required: true },
                    status: {type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
                    
                    read : { type: Number, enum : [0, 1], default : 0, required : true },
                    shippingAddress: {
                        street: { type: String },
                        city: { type: String, required : true },
                        country: { type: String, required : true, default : "Cameroon" }
                    },
                    
                    createdAt : { type : Date, default : Date.now },
                    updatedAt : { type : Date, default : Date.now },
                }
            ], //Un docu pour par order et non par user

    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
   
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
    this.products.forEach(product => {
        product.updatedAt = this.updatedAt;
    });
});

orderSchema.pre('updateOne', { document: true, query: false }, function (next) {
    this.set({ updatedAt: Date.now() });

    const update = this.getUpdate();
    if (update.$set && update.$set.products) {
        update.$set.products.forEach(product => {
            product.updatedAt = this.getUpdate().$set.updatedAt;
        });
    }

    next();

});

module.exports = mongoose.model('Order', orderSchema);
