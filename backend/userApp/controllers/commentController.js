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
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 3; // Nombre d'éléments par page, par défaut 20
    const skip = (page - 1) * limit;
    console.log(req.query.page)

    Comment.find({product : req.params.id}).sort({createdAt : -1}).skip(skip).limit(limit).exec()
    .then( async (comments) => {
        //console.log(comments)
        const totalDatas = await Comment.countDocuments().exec();
        const totalPages = Math.ceil(totalDatas / limit);
        res.status(200).json({datas:comments, page:page,totalPages:totalPages,totalDatas:totalDatas});
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
  };




