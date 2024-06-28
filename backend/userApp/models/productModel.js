const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema
const User = require('../models/userModel')


getusers = () =>{
    User.find({})
       .then((users) => {
       if (users.length > 0) {
           const userName = users.map((user) => user.email);
           console.log(userName)
           return userName;
       } else {
           console.log('No user found.');
           return null; // Handle the case when no products are found
       }
   }).catch((error)=>{
       return error
   });
  
};

const userId = getusers();


const productSchema = new Schema({
    name : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    newPrice : { type : Number, default : () => { return this.price; } },
    minPrice : { type : Number, default : () => { return this.price; } },
    maxPrice : { type : Number, default : () => { return this.price; } },
    condition : { type : String, enum : ['new', 'used'], default : 'new' },
    seller : { type : Schema.Types.ObjectId, ref : 'User', required : true },
    // seller : {type : String, enum : userId, default : "buyer" },
    category : { type : Schema.Types.ObjectId, ref : 'Category', required : true  },
    // category : { type : String, enum : ['Electronique','Vetement','Chaussure','Accessoires','Cosmetique','autre'], default : "buyer" },
    brand : { type : String, required : false },
    couleur : [{ type : String, required : false}],
    images : [{ type : String, required : true}],
    feesBy : { type : String, enum : userId, default : "buyer" },
    garanti : { type : Number, default : 0 },
    stock : { type : Number },
    likes : { type : Number, default : 0 },
    inBasket : { type : Number, default : 0 },
    sold : { type : Number, enum : [0, 1], default : 0 },
    visibility : { type : Number, enum : [0, 1], default : 1  },

    createdAt : { type : Date, default : Date.now() },
    updatedAt : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('Product', productSchema);