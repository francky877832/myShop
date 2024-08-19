const Comment = require('../models/commentModel');
const mongoose = require('../../shared/db').mongoose;
const { ObjectId } = require('mongodb');
const ObjectID = mongoose.Types.ObjectId;


const addProductComment = (req, res, next) => {
   
    //const commentObject = req.body.comment
    //delete commentObject._id
    //delete commentObject.user
    const comment = new Comment({
        user : req.body.user,
        username : req.body.username,
        product : req.body.product,
        text : req.body.text,
        subComment : [],
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


exports.updateProductComment  = (req, res, next) => {
    console.log("COMMENT")
    const newComment = {
            user : req.body.user,
            username : req.body.username,
            product : req.body.product,
            text : req.body.text,
            subComment : [],
    }
    console.log(req.params.id)

if(ObjectId.isValid(req.params.id))
{  //console.log(req.params.id)
    newComment.isResponseTo = req.params.id
    Comment.find({ _id : req.params.id })
    .then(
        (comments) => 
        {
            //console.log("comments")
            if(comments.length > 0)
            {
                //console.log("comments")
                    let cm = comments
                    cm[0].subComment.push(newComment) //new comment
                    Comment.updateOne({ _id : req.params.id },  { subComment : cm[0].subComment })
                        .then(
                            () => {//console.log("ojk")
                                res.status(200).json({message : "Commentaire ajoutée"});
                        })
                        .catch((error) => { res.status(400).json({error : error}); });    
            }
            else
            {
                //console.log("OKK")
                
                addProductComment(req, res, next)
            }
        

              
        })
        .catch((error) => { console.log(error);res.status(400).json({error : error}); });
    }
    else
    {            
        addProductComment(req, res, next)
    }
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

    Comment.find({product : req.params.id}).sort({isResponseTo : -1, _id:-1}).skip(skip).limit(limit).exec()
    .then( async (comments) => {
        //console.log(comments)
        const totalDatas = await Comment.countDocuments({product : req.params.id}).exec();
        const totalPages = Math.ceil(totalDatas / limit);
        res.status(200).json({datas:comments, page:page,totalPages:totalPages,totalDatas:totalDatas});
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
  };

  exports.getUserProductLastComment = (req, res, next) => {
    const productId = req.params.id;
    const userId = req.query.user; // Assurez-vous que le username est traité comme une chaîne

    console.log("LAST COMMENT");
    console.log("Product ID:", productId);
    console.log("UserId:", userId);

    // Convertir productId en ObjectId si ce n'est pas déjà le cas
    const productObjectId = mongoose.Types.ObjectId.isValid(productId) ? new mongoose.Types.ObjectId(productId) : null;
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

    // Vérifier si le productObjectId est valide avant d'exécuter la requête
    if (!productObjectId) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    Comment.find({ 
        product: productObjectId, 
        user: userObjectId
    })
    .sort({ updatedAt: -1 })
    .then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments[0]);
        } else {
            res.status(404).json({ error: "No comments found" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: error.message });
    });
};




