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

function isBcryptHash(password) {
  return typeof password === 'string' && password.startsWith('$2') && password.length === 60;
}

exports.signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          username : req.body.username,
          image : 'new-user.jpg'
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.loginUser =  (req, res, next) => {
    console.log("LOGIN")
    let validePassword=false;
    
    User.findOne({ email: req.query.email })
        .populate('followers')
        .populate('followings')
        .populate('favourites')
        .then( async (user) => {
          
          console.log(req.query)
            if (!user) {
                return res.status(401).json({ error: 'auth/user-not-found--' });
            }
            //user.password = await bcrypt.hash('00000000', 10)
            //user.save()
            //console.log(req.query.password)
            //console.log(user.password)
            if(!isBcryptHash(req.query.password))
            {
              validePassword = await bcrypt.compare(req.query.password, user.password)
              console.log("validePassword")
            }
            else
            {
              validePassword = req.query.password.toString() === user.password.toString()
              console.log(" not validePassword")
            }
              
            if (!validePassword) {
              return res.status(401).json({ error: 'auth/incorrect-password' });
            }
            else
            {
              const token = generateToken(user._id);
              res.status(200).json({ token:token, user : user });
            }    

        })
        .catch(error => res.status(500).json({ error: error }));
 };

 exports.updateUser = async (req, res, next) => {
  const userId = req.params.user
  let updatedDatas = req.body
  const imageFiles = req.files || []
  try
  {
    console.log(req.body.password)
    let password;
    if(Object.keys(req.body).includes('password'))
    {
      password = await bcrypt.hash(req.body.password, 10)
      updatedDatas = {...req.body, password:password}
      console.log(password)
    }

    const images = imageFiles.map((file)=> {return `${file.filename}`})
    if(images.length>0)
    {
      updatedDatas = {...updatedDatas, image:images[0]}
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) }, 
      { $set: updatedDatas },  
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
    }
    else
    {
      res.status(200).json({ success: true, message: 'Informations mises à jour avec succès.', user: updatedUser});
    }

  
  }catch(error){
    console.log(error)
    res.status(500).json({ error })
  }


}

 

 
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

exports.getReferredUsers = async (req, res) => {
  const { userId } = req.params;
//console.log("éokk")
  try {
      const referredUsers = await User.aggregate([
          {
              $match: {
                  referredBy: new mongoose.Types.ObjectId(userId)
              }
          },
          {
              $lookup: {
                  from: 'users', 
                  localField: 'followers', 
                  foreignField: '_id', 
                  as: 'followers'
              }
          },
          {
            $lookup: {
                from: 'users', 
                localField: 'followings', 
                foreignField: '_id', 
                as: 'followings'
            }
        },
        {
          $lookup: {
              from: 'users', 
              localField: 'favourites', 
              foreignField: '_id', 
              as: 'favourites'
          }
      }
         
      ]);

      res.status(200).json(referredUsers);
  } catch (error) {
    //console.log(error)
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs référencés", error });
  }
};



