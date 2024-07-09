const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//modele pour les notificaitons
//
const notificatonSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    source : { type : String, enum: ['app', 'admin'], defualt : "app", required : true },
    type : { type : String, enum: ['normal', 'campagne', 'suggestion', 'modal'], default : "normal", required : true },
    message : { type : String, required : true },
    link : { type : String, required : true },
    read : { type : Number, enum: [0, 1], default : 0, required : true },
    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Notification', notificatonSchema);
