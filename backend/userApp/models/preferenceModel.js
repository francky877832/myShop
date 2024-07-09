const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//utulisera un petit model IA pour repertorier les preference des users pour des meilleurs suggestions
//ou se basera juste sur les produits likes et achetes, les produit dans le panier, les produits commnentes
const preferenceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    preferences : [{
                //category : { type : Schema.Types.ObjectId, ref : 'Category', required : true  },
                /*//POUR LES TESTS*/
                category : { type : String, required : true  },
                
                createdAt : { type : Date, default : Date.now },
                updatedAt : { type : Date, default : Date.now },
            }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Preference', preferenceSchema);
