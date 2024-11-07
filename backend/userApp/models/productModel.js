const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema


const productSchema = new Schema({
    name : { type : String, required : true },
    description : { type : String, required : true },

    price : { type : Number, required : true },
    newPrice: { type: Number, default: function() { return this.price; } },
    

    minPrice: { type: Number, default: function() { return this.price - this.price*10/100; } },
    maxPrice: { type: Number, default: function() { return this.price + this.price*10/100; } },


    kargoPrice: { type: Number, required : false },

    condition : { type : String, enum : ['new', 'used', "new used"], default : 'new' },
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    sellerName : { type : String, required : false, },

    //category : { type : Schema.Types.ObjectId, ref : 'Category', required : true  },
    category : { type : String, required : false, default:"Autres/Autres" },
    brand : { type : String, required : false },
    color : { type : String, required : false},
    
    images : [{ type : String, required : true}],
    garanti : { type : Number, default : 0 }, //en jour
    likes : { type : Number, default : 0, validate: {validator: function(v) {
        return v >= 0;
        },
        message: 'Les likes doit être au moins 1.'
    }},

    stock : { type : Number, default : 1 },
    feesBy : { type : String, enum : ['seller', 'buyer'], default : "buyer" },
    inBasket : { type : Number, default : 0 },
    sold : { type : Number, enum : [0, 1, 2], default : 0 }, // 2 = orders
    visibility : { type : Number, enum : [0, 1], default : 1  },
    updated : { type : Number, enum : [0, 1], default : 0  },
    views : { type : Number, default : 1 },

    favourites : [{ type : Schema.Types.ObjectId, ref : 'User', required : false }],

    notes : [
        {
            user : { type : Schema.Types.ObjectId, ref : 'User', required : false },
            star : { type: Number, default : 0 },
        }
    ],

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Product', productSchema);