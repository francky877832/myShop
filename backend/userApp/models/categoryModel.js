const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String ,required: true   },
    gender : {type: Boolean , default: true },
    sub_categories:{ type : Schema.Types.ObjectId, ref : 'subCategories', required : true },
    createdAt : { type : Date, default : Date.now() },
    updatedAt : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('Category', categorySchema);