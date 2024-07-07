const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//modele pour les notificaitons
//
const basketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username : {type : String, required : true},
    products: [{ type : Schema.Types.ObjectId, ref: 'Product', required: true }],     
});

module.exports = mongoose.model('Basket', basketSchema);
