const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Represente chaque user avec ses keyword et ses filtres
const searchHistorytSchema = new Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User', required : true },  
    filters : [{ 
                    keyword : { type : String, required : true },
                   /* condition : { type : String, enum : ['new', 'used'] },
                    category : { type : Schema.Types.ObjectId, ref : 'Category'},
                    minPrice : { type : Number },
                    maxPrice : { type : Number },
                    feesBy : { type : String, enum : ['seller', 'buyer'] },*/
                    createdAt : { type : Date, default : Date.now },
                    updatedAt : { type : Date, default : Date.now }
                }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('SearchHistory', searchHistorytSchema);