const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: { type: String, required: true },
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Brand', brandSchema);