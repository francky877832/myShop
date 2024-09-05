const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
//modele pour les notificaitons
//
const notificatonSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //user: { type : String, required : true, unique : true },
    notifications : [{
            _id: { type: Schema.Types.ObjectId, required: true},
            source : { type : String, enum: ['app', 'admin'], defualt : "app", required : true },
            model : { type : String, enum: ['normal', 'campagne', 'suggestion', 'modal', 'user', 'products', 'offers', 'orders', 'comments', 'admin'], default : "products", required : true },
            
            title : { type : String, required : true, default:"Produit" },
            message : { type : String, required : true },
            type : { type : String, required : true, default:'ON_NEW_LIKE' },
            action : { type : String, required : true },
            datas : { type : Schema.Types.ObjectId, required : false },
            read : { type : Number, enum: [0, 1], default : 0, required : true },
            createdAt : { type : Date, default : Date.now },
            updatedAt : { type : Date, default : Date.now },
    }],
    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
},  { versionKey: false });

notificatonSchema.index({ user: 1, 'notifications.type': 1, 'notifications.datas': 1 }, { unique: true });

notificatonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Notification', notificatonSchema);
