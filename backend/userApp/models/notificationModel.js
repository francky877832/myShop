const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
//modele pour les notificaitons
//
const notificatonSchema = new Schema({
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user: { type : String, required : true, unique : true },
    notifications : [{
            _id: { type: Schema.Types.ObjectId, required: true},
            source : { type : String, enum: ['app', 'admin'], defualt : "app", required : true },
            type : { type : String, enum: ['normal', 'campagne', 'suggestion', 'modal', 'product', 'offer', 'order'], default : "normal", required : true },
            message : { type : String, required : true },
            action : { type : String, required : true },
            datas : { type : Schema.Types.ObjectId, required : false },
            read : { type : Number, enum: [0, 1], default : 0, required : true },
            createdAt : { type : Date, default : Date.now },
            updatedAt : { type : Date, default : Date.now },
    }],
    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

notificatonSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Notification', notificatonSchema);
