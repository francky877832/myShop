const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});