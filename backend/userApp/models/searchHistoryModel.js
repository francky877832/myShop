const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//Represente chaque user avec ses keyword et ses filtres
const searchHistorytSchema = new Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User', required : true }, 
    username : { type : String, required : true},
    filters : 
                    { type : Schema.Types.Array, required : true ,
                   /* condition : { type : String, enum : ['new', 'used'] },
                    category : { type : Schema.Types.ObjectId, ref : 'Category'},
                    minPrice : { type : Number },
                    maxPrice : { type : Number },
                    feesBy : { type : String, enum : ['seller', 'buyer'] },*/
                },
});

module.exports = mongoose.model('SearchHistory', searchHistorytSchema);