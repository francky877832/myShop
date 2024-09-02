const User = require('../models/userModel');
const PointsHistory = require('../models/pointsHistoryModel');

const Session = require('../models/sessionModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = 'RANDOM_TOKEN_SECRET'
const generateToken = (userId) => {
    const token = jwt.sign({ userId : userId }, JWT_SECRET, { expiresIn: '7d' });
    return token;
};


exports.signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          username : req.body.username
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.loginUser =  (req, res, next) => {
    console.log("LOGIN")
    User.findOne({ username: req.query.username })
        .populate('followers')
        .populate('followings')
        .populate('favourites')
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'auth/user-not-found' });
            }
            bcrypt.compare(req.query.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'auth/incorrect-password' });
                    }
                    
                    const token = generateToken(user._id);
                    res.status(200).json({ token:token, user : user });
                })
                .catch(error => res.status(500).json({ error : error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 

 
 exports.setUserFollowers = async (req, res, next) => {
   const followingId = new mongoose.Types.ObjectId(req.params.user);
   const followerId = new mongoose.Types.ObjectId(req.body.follower);
 
   try {
     const followingUser = await User.findById(followingId).exec();
     const followerUser = await User.findById(followerId).exec();
 
     if (!followingUser || !followerUser) {
       throw new Error("User not found");
     }
 
     // Update followers of the following user
     const followerIndex = followingUser.followers.indexOf(followerId);
     if (followerIndex > -1) {
       followingUser.followers.splice(followerIndex, 1);
     } else {
       followingUser.followers.unshift(followerId);  // Add to the beginning
     }
     await User.findByIdAndUpdate(followingId, { followers: followingUser.followers }).exec();
 
     // Update followings of the follower user
     const followingIndex = followerUser.followings.indexOf(followingId);
     if (followingIndex > -1) {
       followerUser.followings.splice(followingIndex, 1);
     } else {
       followerUser.followings.unshift(followingId);  // Add to the beginning
     }
     await User.findByIdAndUpdate(followerId, { followings: followerUser.followings }).exec();
 
     res.status(200).json('User followers and followings updated');
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 
 
 exports.getUserFollowers = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 100; // Nombre d'éléments par page, par défaut 5
    const skip = (page - 1) * limit;

    User.findOne({ _id : req.params.id })
    .populate('followers')
    .populate('followings')
    .populate('favourites')
    .then(async (user)=>{
        if(!user)
        {
            throw new Error('No-user-found')
        }
        const totalDatas = await User.countDocuments().exec();
        const totalPages = Math.ceil(totalDatas / limit);
        const datas = {followers:user.followers.slice(skip, skip+limit), followings:user.followings.slice(skip, skip+limit)}
        res.status(200).json({user:datas, page: page, totalPages: totalPages, totalDatas: totalDatas });
    })
    .catch(error => res.status(500).json({ error }));
 }



exports.getUser = (req, res, next) => {
    User.findOne({ _id : req.params.id })
    .then((user)=>{
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
}

