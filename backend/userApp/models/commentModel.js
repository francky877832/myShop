const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    text: { type: String, required: true },
    isResponseTo : { type : Schema.Types.ObjectId,  ref : "Comment", default : function () {  return this._id; } },
    visible : { type : Number, enum : [0, 1], default : 0 },
    createdAt : { type : Date, default : Date.now() },
    updatedAt : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('Comment', commentSchema);
