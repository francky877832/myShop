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
    const userId = req.query.user; // Assurez-vous que le userId est traité comme une chaîne

    console.log("LAST COMMENT");
    console.log("Product ID:", productId);
    console.log("UserId:", userId);

    // Convertir productId et userId en ObjectId si ce n'est pas déjà le cas
    const productObjectId = mongoose.Types.ObjectId.isValid(productId) ? new mongoose.Types.ObjectId(productId) : null;
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;

    // Vérifier si les IDs sont valides avant d'exécuter la requête
    if (!productObjectId || !userObjectId) {
        return res.status(400).json({ error: "Invalid product ID or user ID" });
    }

    // Pipeline d'agrégation
  
    Comment.aggregate([
    {
        $match: {
            product: productObjectId,
            $or: [
                { user: userObjectId },
                { "subComment.user": userObjectId }
            ]
        },
    },
    {
        $facet: {
            // Pipeline to handle comments
            mainComments: [
                {
                    $project: {
                        _id: 1,
                        product: 1,
                        text: 1,
                        user: 1,
                        username: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        isSubComment: { $literal: false }
                    }
                }
            ],
            // Pipeline to handle subComments
            subComments: [
                {
                    $unwind: "$subComment"
                },
                {
                    $match: {
                        "subComment.user": userObjectId
                    }
                },
                {
                    $project: {
                        _id: "$subComment._id",
                        product: "$product",
                        text: "$subComment.text",
                        user: "$subComment.user",
                        username: "$subComment.username",
                        createdAt: "$subComment.createdAt",
                        updatedAt: "$subComment.updatedAt",
                        isSubComment: { $literal: true },
                        isResponseTo :  "$subComment.isResponseTo",
                    }
                }
            ]
        }
    },
    {
        // Combine both pipelines
        $project: {
            allComments: {
                $concatArrays: ["$mainComments", "$subComments"]
            }
        }
    },
    {
        // Unwind to treat them as individual documents
        $unwind: "$allComments"
    },
    {
        // Sort by updatedAt to get the most recent comment/subComment
        $sort: {
            "allComments.updatedAt": -1
        }
    },
    {
        // Limit to get only the most recent one
        $limit: 1
    },


        {
            $lookup: {
              from: 'users',
              localField: 'allComments.user',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: '$user' }, // Décomposer le tableau seller en objets individuels
          {
            $lookup: {
              from: 'users',
              localField: 'user.followers',
              foreignField: '_id',
              as: 'user.followers'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user.followings',
              foreignField: '_id',
              as: 'user.followings'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user.favourites',
              foreignField: '_id',
              as: 'user.favourites'
            }
          },
          {
            $lookup: {
              from: 'favourites',
              localField: 'user.favourites',
              foreignField: '_id',
              as: 'favourites'
            }
        },

        {
            $lookup: {
              from: 'users',
              localField: 'subComment.user',
              foreignField: '_id',
              as: 'subCommentUsers'
            }
        },

        {
                // Project the final structure
                $project: {
                    _id: "$allComments._id",
                    product: "$allComments.product",
                    text: "$allComments.text",
                    user: "$user",
                    username: "$allComments.username",
                    isSubComment: "$allComments.isSubComment",
                    isResponseTo: {
                            $cond: {
                                if: { $eq: ["$allComments.isSubComment", true] },
                                then: "$allComments.isResponseTo",
                                else: null
                            }
                        },
                    createdAt: "$allComments.createdAt",
                    updatedAt: "$allComments.updatedAt"
                  }
        }
    ])
    .then(comments => {
        console.log(comments)
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


/*

Comment.aggregate([
        {
            $match: {
                product: productObjectId,
                $or: [
                    { user: userObjectId },
                    { "subComment.user": userObjectId }
                ]
            },
        },

        {
            $facet: {
                // Pipeline to handle comments
                mainComments: [
                    {
                        $project: {
                            _id: 1,
                            product: 1,
                            text: 1,
                            user: 1,
                            username: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            isSubComment: { $literal: false }
                        }
                    }
                ],
                // Pipeline to handle subComments
                subComments: [
                    {
                        $unwind: "$subComment"
                    },
                    {
                        $match: {
                            "subComment.user": userObjectId
                        }
                    },
                    {
                        $project: {
                            _id: "$subComment._id",
                            product: "$product",
                            text: "$subComment.text",
                            user: "$subComment.user",
                            username: "$subComment.username",
                            createdAt: "$subComment.createdAt",
                            updatedAt: "$subComment.updatedAt",
                            isSubComment: { $literal: true }
                        }
                    }
                ]
            }
        },
        {
            // Combine both pipelines
            $project: {
                allComments: {
                    $concatArrays: ["$mainComments", "$subComments"]
                }
            }
        },
        {
            // Unwind to treat them as individual documents
            $unwind: "$allComments"
        },
        {
            // Sort by updatedAt to get the most recent comment/subComment
            $sort: {
                "allComments.updatedAt": -1
            }
        },
        {
            // Limit to get only the most recent one
            $limit: 1
        },
    ])

*/

