const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//Ce modele est pour la communication entre les users et le service client de lappli
//
const serviceSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message : { type : String, required : true },
    isResponseTo : { type : Schema.Types.ObjectId,  ref : "Service", default : function () {  return this._id; } },

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);
