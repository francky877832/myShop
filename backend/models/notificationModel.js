const mongoose = require('mongoose');
const Schema = mongoose.Schema

//modele pour les notificaitons
//
const notificatonSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type : { type : String, enum: ['normal', 'campagne', 'suggestion'], defualt : "normal", required : true },
    message : { type : String, required : true },
    link : { type : String, required : true },
    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Notification', notificatonSchema);
