const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    subCategories : [{ 
                        name : { type: String },
                        createdAt : { type : Date, default : Date.now },
                        updatedAt : { type : Date, default : Date.now },
                    },],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Category', categorySchema);