const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const appName = "TheStyle"
const userSchema = new Schema({
    name: { type: String },
    //surname: { type: String },
    username: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'seller' },
    address: {
        quater: { type: String },
        city: { type: String },
        country: { type: String, default:'Cameroon' },
        title: { type: String },
        completeAddress : {type : String }
    },
    phone: { type: String },
    isPhoneVerified : { type: Number, enum: [0, 1], default : 0 },
    isEmailVerified : { type: Number, enum: [0, 1], default : 0 },
    image : { type: String },
    ventes : { type: Number, default : 0 },

    follower : { type: Number, default : 0 },
    following : { type: Number, default : 0 },
    favourite : { type: Number, default : 0 },
    products : { type: Number, default : 0 },

    followers : [{ type : Schema.Types.ObjectId, ref : 'User', required : false }],
    followings : [{ type : Schema.Types.ObjectId, ref : 'User', required : false }],
    favourites : [{ type : Schema.Types.ObjectId, ref : 'User', required : false }],
    
    online : { type: Number, enum: [0, 1], default : 0 },
    actif : { type: Number, enum: [0, 1], default : 0 },
    star : { type: Number, default : 0 },
    code : { type: String },
    slogan : { type: String },

    notes : [
        {
            user : { type : Schema.Types.ObjectId, ref : 'User', required : false },
            star : { type: Number, default : 0 },
        }
    ],

    referralCode: { type: String, unique: true },
    referredBy: { type : Schema.Types.ObjectId, ref : 'User', required : false },

    points : { type: Number, default : 0 },

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);