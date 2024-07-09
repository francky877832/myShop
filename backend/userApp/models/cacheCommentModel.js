const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;

//Ce modele stocke temporairement les donnees provenant de lutilisateurs et qui on ont besoin
//dune approbation de ladmin avant detre poste sur le bon modele ou refuse, auqueş quel luser sera avertit
//etat 0.refuse, 1.en-attente-dexmination
//Sil est valide on de supprime de la cache
const cacheCommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    text: { type: String, required: true },
    isResponseTo : { type : Schema.Types.ObjectId,  ref : "Comment" },
    etat :  { type: String, enum: [0, 1], default: 1 },

    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});


module.exports = mongoose.model('CacheComment', cacheCommentSchema);
