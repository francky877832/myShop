const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

function generateUniqueDeliveryNumber() {
    const datePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    return `${datePart}-${randomPart}`.toUpperCase(); 
}

const orderSchema = new  Schema({
    sellers : [{ type : Schema.Types.ObjectId, ref : 'User', required : true }],
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'GroupOrder', required: true },

    products: [
                {
                    product : {type: Schema.Types.ObjectId, ref: 'Product', required: true },
                    quantity: { type: Number, required: true, default: 1 },
                    uniquePrice : { type: Number, required: true, },

                    status: {type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
                    delivererConfirmation :  {type: String, enum: [0, 1, 2], default: 2 },
                    buyerConfirmation :  {type: String, enum: [0, 1, 2], default: 2 },
                    //group: { type: Schema.Types.ObjectId, ref: 'GroupOrder', required: true },
                    deliveryNo: { type: String, default : null },
                    deliveryDate: { type : Date, default : null },
                    createdAt : { type : Date, default : Date.now },
                    updatedAt : { type : Date, default : Date.now },
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
