const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const commentSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    visible : { type : Number, enum : [0, 1], default : 0 },
    subComment : [{    
        _id : { type: Schema.Types.ObjectId,  default: () => new mongoose.Types.ObjectId() },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        isResponseTo : { type : Schema.Types.ObjectId,  ref : "Comment", default : function () {  return this._id; } },
        text: { type: String, required: true },
        visible : { type : Number, enum : [0, 1], default : 0 },
        createdAt : { type : Date, default : Date.now },
        updatedAt : { type : Date, default : Date.now }
    }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
