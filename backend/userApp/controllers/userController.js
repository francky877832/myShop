const User = require('../models/userModel.js');
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
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        user : user,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
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

exports.getAllUser = (req, res, next) => {
    User.find()
    .then((user)=>{
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
}



