const Comment = require('../models/commentModel');
const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;


exports.addProductComment = (req, res, next) => {
   
    //const commentObject = req.body.comment
    //delete commentObject._id
    //delete commentObject.user
    const comment = new Comment({
        user : req.body.user,
        username : req.body.username,
        product : req.params.product,
        text : req.body.text,
        isResponseTo : req.body.isResponseTo
    })
    comment.save()
    .then( () => {
        //console.log("COMMENT")
        res.status(200).json({ message: "Commentaire ajoute avec succes pour ce produit." });
    })
    .catch( (error) => {
        //console.log(error)
        res.status(400).json({ error: error });
    });
};

exports.validateProductComment = (req, res, next) => {

    Comment.updateOne({ _id : req.params.id }, { visible : 1 })
    .then( () => {
        res.status(200).json({ message: "Commentaire valide pour etre posté." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};

exports.removeProductComment = (req, res, next) => {
    Comment.deleteOne({ _id : req.params.id })
    .then( () => {
        res.status(200).json({ message: "Commentaire supprimé car il viole les regles de la communauté." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};

exports.getProductComments = (req, res, next) => {
    Comment.find({product : req.params.id})
    .sort({createdAt : -1})
    .then( (products) => {
        console.log(products)
        res.status(200).json(products);
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
  };




