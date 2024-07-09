const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//LOGİQUE : Un document = un user et ses produit likes mais le pb est quon ne pourra pas obtenir 
//la date a laquelle chaque produit a ete like mais cest pas necessaire
//on utilisera un gestion de state comme Redux
const favouriteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username : {type : String, required : true},
    products: [{ type : Schema.Types.ObjectId, ref: 'Product', required: true }], 

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
