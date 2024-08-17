const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema


const productSchema = new Schema({
    name : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    newPrice: { type: Number, default: function() { return this.price; } },
    minPrice: { type: Number, default: function() { return this.price; } },
    maxPrice: { type: Number, default: function() { return this.price; } },
    condition : { type : String, enum : ['new', 'used', "new used"], default : 'new' },
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    sellerName : { type : String, required : false, },

    //category : { type : Schema.Types.ObjectId, ref : 'Category', required : true  },
    category : { type : String, required : false, default:"Autres/Autres" },
    brand : { type : String, required : false },
    couleur : [{ type : String, required : false}],
    
    images : [{ type : String, required : true}],
    feesBy : { type : String, enum : ['seller', 'buyer'], default : "buyer" },
    garanti : { type : Number, default : 0 }, //en jour
    stock : { type : Number, default : 1 },
    likes : { type : Number, default : 0 },
    inBasket : { type : Number, default : 0 },
    sold : { type : Number, enum : [0, 1], default : 0 },
    visibility : { type : Number, enum : [0, 1], default : 1  },

    favourites : [{ type : Schema.Types.ObjectId, ref : 'User', required : false }],

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Product', productSchema);