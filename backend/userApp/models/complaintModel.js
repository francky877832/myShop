const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//Cette collection permettra a un buyer de se plaindre dun seller, en general lorsque le produit recu a un pb
//ou nest pas comme specifie sur limage
const complaintSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message : { type : String, required : true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
