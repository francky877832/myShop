const User = require('../models/userModel');
const Session = require('../models/sessionModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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
    //console.log("ok")
    User.findOne({ username: req.query.username })
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


exports.getUser = (req, res, next) => {
    User.findOne({ _id : req.params.id })
    .then((user)=>{
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
}



