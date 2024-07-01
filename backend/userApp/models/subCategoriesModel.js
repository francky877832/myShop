const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const subCategorySchema = new  Schema({
    name : { type: String ,required: true, unique: true },
    description: { type: String ,required: true, unique: true },
    createdAt : { type : Date, default : Date.now() },
    updatedAt : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('subCategory', subCategorySchema);