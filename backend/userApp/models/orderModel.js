const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

function generateUniqueDeliveryNumber() {
    const datePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    return `${datePart}-${randomPart}`.toUpperCase(); 
}

const orderSchema = new  Schema({
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
                {
                    _id : { type: Schema.Types.ObjectId, required: true },
                    product : {type: Schema.Types.ObjectId, ref: 'Product', required: true },
                    status: {type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
                    groupId: { type: Schema.Types.ObjectId, ref: 'GroupOrder', required: true },
                    quantity: { type: Number, required: true, default: 1 },
                    deliveryNo: { type: String, required : true, default : 0 },
                    deliveryDate: { type : Date, default : Date.now },
                    createdAt : { type : Date, default : Date.now },
                    updatedAt : { type : Date, default : Date.now },
                    paymentMethod : {type: String, enum: ['MTN Money', 'Orange Money']}, //require:true
                    paymentDetails : {type: String,  }, //require:true
                }
            ],

   
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
