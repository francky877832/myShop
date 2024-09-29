const User = require('../models/userModel');
const PointsHistory = require('../models/pointsHistoryModel');

const Session = require('../models/sessionModel');
const { uploadToServer } = require('../services/filesServices')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const JWT_SECRET = 'WINKEL_RANDOM_TOKEN_SECRET'
const generateToken = (userId) => {
    const token = jwt.sign({ userId : userId }, JWT_SECRET, { expiresIn: '7d' });
    return token;
};

function isBcryptHash(pass) {
  const password = pass
  //console.log(password)
  return typeof password === 'string' && password.startsWith('$2') && password.length === 60;
}


async function generateUniqueUsername() {
  const baseName = 'winkel';
  let uniqueUsername = '';
  let isUnique = false;

  while (!isUnique) {
    const randomPart = Math.floor(Math.random() * 10000000000); // entre 0 et 9999999999
    uniqueUsername = `${baseName}${randomPart}`;

    const existingUser = await User.findOne({ username: uniqueUsername });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return uniqueUsername;
}


exports.signupUser = async (req, res, next) => {
  //console.log(req.body)
  try {
    let user;
    user = await User.findOne({ email: req.body.email })
    //console.log(user)
    if(user)
    {
        return res.status(401).json({ error: 'auth/user-already-exists' });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    user = new User({
      email: req.body.email,
      password: hash,
      username: await generateUniqueUsername(),
      image: 'new-user.jpg'
    });
    await user.save();

    res.status(200).json({ success: true, message: 'auth/user-created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'auth/error-creating-user' });
  }
};

  exports.loginUser =  (req, res, next) => {
    console.log("LOGIN")
    let validePassword=false;
    
    User.findOne({ email: req.query.email })
        .populate('followers')
        .populate('followings')
        .populate('favourites')
        .then( async (user) => {
          
          //console.log(req.query)
            if (!user) 
            {
 
                  return res.status(401).json({ error: 'auth/user-not-found--' });
            }
            //user.password = await bcrypt.hash('00000000', 10)
            //user.save()
            //console.log(req.query.password)
            //console.log(user.password)
            if(!isBcryptHash(req.query.password))
            {
              validePassword = await bcrypt.compare(req.query.password, user.password)
              //console.log("validePassword")
            }
            else
            {
              validePassword = req.query.password.toString() === user.password.toString()
              //console.log(" not validePassword")
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
        .catch(error => res.status(500).json({ error }));
 };

 exports.updateUser = async (req, res, next) => {
  const userId = req.params.user
  let updatedDatas = req.body
  const imageFiles = req.files || []
  try
  {
    //console.log(req.body.password)
    //console.log(userId)

    let password, address;
    if(Object.keys(req.body).includes('password'))
    {
      password = await bcrypt.hash(req.body.password, 10)
      updatedDatas = {...req.body, password:password}
      //console.log(password)
    }

    if(Object.keys(req.body).includes('address'))
      {
        address = JSON.parse(req.body.address)
        updatedDatas = {...req.body, address:address}
        //console.log(password)
      }
//console.log(imageFiles)
    const images = imageFiles.map((file)=> {return ( {...file, fileName:`${Date.now()}${file.originalname}`} )})
    let links 
    if(images.length>0)
    {
      links = images.map(async (file) => {
        const fileName = file.fileName.split(' ').join('_');
        
        const sharedLink = await uploadToServer(file.buffer, fileName, 'users');
        return sharedLink;
      });

      links = await Promise.all(links)
    }
      const newImagesNames = links?.map(link => {
        const parts = link.split('/');
        const fileName = parts[parts.length - 1];
        const folderName = parts[parts.length - 2];
        return `${folderName}/${fileName}`;
      })
      //updatedDatas = {...updatedDatas, image:images[0].fileName}
      updatedDatas = {...updatedDatas, image:newImagesNames[0]}
    

    let match;
   
    if(mongoose.Types.ObjectId.isValid(userId))
    {
      match = { _id: new mongoose.Types.ObjectId(userId) }
    }
    else
    {
      match = { email: userId } //for resetPassword
    }
    const updatedUser = await User.findOneAndUpdate(
     { ...match },
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
    User.findOne({ email : req.params.email })
    .then((user)=>{
        //console.log(user)
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



