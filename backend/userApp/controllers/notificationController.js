const Notification = require('../models/notificationModel');
const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;


const createNotificationObject = (req) => ({
    _id: new ObjectId().toHexString(),
    source: req.body.source,
    type: req.body.type.toLowerCase(),
    message: req.body.message,
    action: req.body.action,
    read: req.body.read,
    datas: req.body.datas,
    title : req.body.title,
});

const productPipeline = (req, res, next) => {
    const pipeline = [
        {
        $lookup: {
            from: 'users',
            localField: 'seller',
            foreignField: '_id',
            as: 'seller'
        }
        },
        { $unwind: '$seller' }, // Décomposer le tableau seller en objets individuels
        {
        $lookup: {
            from: 'users',
            localField: 'seller.followers',
            foreignField: '_id',
            as: 'seller.followers'
        }
        },
        {
        $lookup: {
            from: 'users',
            localField: 'seller.followings',
            foreignField: '_id',
            as: 'seller.followings'
        }
        },
        {
        $lookup: {
            from: 'users',
            localField: 'seller.favourites',
            foreignField: '_id',
            as: 'seller.favourites'
        }
        },
        {
        $lookup: {
            from: 'favourites',
            localField: 'favourites',
            foreignField: '_id',
            as: 'favourites'
        }
        },
        {
        $lookup: {
            from: 'comments',
            let: { productId: '$_id' },
            pipeline: [
            { $match: { $expr: { $eq: ['$product', '$$productId'] } } },
            { $sort: { _id: -1 } },
            {
                $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
                }
            },
            {
                $unwind: '$user' // Décomposer le tableau user en objets individuels
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
                $addFields: {
                subComment: {
                    $map: {
                    input: '$subComment',
                    as: 'sub',
                    in: {
                        _id: '$$sub._id',
                        user: {
                        $arrayElemAt: [
                            {
                            $filter: {
                                input: '$subCommentUsers',
                                cond: { $eq: ['$$sub.user', '$$sub.user'] }
                            }
                            },
                            0
                        ]
                        },
                        username: '$$sub.username',
                        isResponseTo: '$$sub.isResponseTo',
                        text: '$$sub.text',
                        visible: '$$sub.visible',
                        createdAt: '$$sub.createdAt',
                        updatedAt: '$$sub.updatedAt'
                    }
                    }
                }
                }
            }
            ],
            as: 'comments'
        }
        }
    ];
    return pipeline
}


const addUserNotification = async (req, res) => {
    const notification = new Notification({
        user: new ObjectId(req.params.user),
        notifications: [createNotificationObject(req)],
    });

    try {
        await notification.save();
        res.status(200).json({ message: "Notification créée." });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.updateUserNotifications = async (req, res) => {
    //console.log("NOTIF GOT")
    const newNotification = createNotificationObject(req);
    //console.log(newNotification)

    try {
        const existingNotification = await Notification.findOne({
            user: req.params.user,
            notifications: {
                $elemMatch: {
                    type: req.body.type,
                    datas: req.body.datas,
                }
            }
        });
        if (existingNotification) {
            console.log("Notification already exists for this type and datas.")
            return res.status(200).json({ message: "Notification already exists for this type and datas." });
        }


        const existingUser = await Notification.findOne({ user: req.params.user });
        if (existingUser) {
            existingUser.notifications.unshift(newNotification);
            await existingUser.save();
            res.status(200).json({ message: "Notification ajoutée." });
        } else {
            await addUserNotification(req, res);
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};



exports.updateUserNotificationRead = async (req, res, next) => {
    try {
        const { user, id } = req.params;

        // Mettre à jour la notification spécifique
        const result = await Notification.findOneAndUpdate(
            { user:user, 'notifications._id': id },
            { $set: { 'notifications.$.read': 1 } },
            { new: true } // Renvoie le document mis à jour
        );

        // Vérifier si une notification a été trouvée et mise à jour
        if (!result) {
            return res.status(400).json({ error: "not-notif-found-for-this-user" });
        }

        res.status(200).json({ message: "Notification mise à jour avec succès." });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};




exports.getUserNotifications = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 3; // Nombre d'éléments par page, par défaut 3
    const skip = (page - 1) * limit;

    const dataTypes = ['users', 'products', 'orders']; // Peut être généré dynamiquement

    // Étapes de lookup
    const lookupStages = dataTypes.map(type => ({
      $lookup: {
        from: type,
        localField: 'notifications.datas', // Référence le champ 'datas' dans le tableau 'notifications'
        foreignField: '_id',
        as: `${type}Data`
      }
    }));
    
    // Étapes pour le switch en fonction du type de données
    const switchBranches = dataTypes.map(type => ({
      case: { $eq: ["$notifications.type", type] },
      then: { $arrayElemAt: [`$${type}Data`, 0] }
    }));
    
    // Pipeline d'agrégation
    const pipeline = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.params.user), // Assurez-vous que le user est un ObjectId
        }
      },
      {
        $unwind: '$notifications' // Déplier le tableau 'notifications'
      },
      ...lookupStages,
      {
        $addFields: {
          'notifications.dataDetails': {
            $switch: {
              branches: switchBranches,
              default: null
            }
          }
        }
      },


       {
        $lookup: {
          from: 'users',
          localField: 'notifications.dataDetails.seller',
          foreignField: '_id',
          as: 'seller'
        }
      },
      {
        $unwind: {
            path: '$seller',
            preserveNullAndEmptyArrays: true // Conservez les notifications sans vendeur associé
        }
    },

      {
        $lookup: {
          from: 'users',
          localField: 'seller.followers',
          foreignField: '_id',
          as: 'seller.followers'
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'seller.followings',
          foreignField: '_id',
          as: 'seller.followings'
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'seller.favourites',
          foreignField: '_id',
          as: 'seller.favourites'
        }
      },


      {
        $lookup: {
          from: 'users',
          localField: 'notifications.dataDetails.favourites',
          foreignField: '_id',
          as: 'favourites'
        }
      },
      {
        $lookup: {
          from: 'comments',
          let: { productId: '$notifications.dataDetails._id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$product', '$$productId'] } } },
            { $sort: { _id: -1 } },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
              }
            },
            {
              $unwind: '$user' // Décomposer le tableau user en objets individuels
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
              $addFields: {
                subComment: {
                  $map: {
                    input: '$subComment',
                    as: 'sub',
                    in: {
                      _id: '$$sub._id',
                      user: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$subCommentUsers',
                              cond: { $eq: ['$$sub.user', '$$sub.user'] }
                            }
                          },
                          0
                        ]
                      },
                      username: '$$sub.username',
                      isResponseTo: '$$sub.isResponseTo',
                      text: '$$sub.text',
                      visible: '$$sub.visible',
                      createdAt: '$$sub.createdAt',
                      updatedAt: '$$sub.updatedAt'
                    }
                  }
                }
              }
            }
          ],
          as: 'comments'
        }
    },



    {
        $addFields: {
            'notifications.dataDetails': {
                $mergeObjects: [
                    '$notifications.dataDetails', // Conserver les détails existants
                    {
                        // Remplacer les informations de seller avec les informations jointes
                        seller: {
                            $mergeObjects: [
                                '$seller',
                                {
                                    followers: { $ifNull: ['$seller.followers', []] },
                                    followings: { $ifNull: ['$seller.followings', []] },
                                    favourites: { $ifNull: ['$seller.favourites', []] }
                                }
                            ]
                        },
                        // Ajouter les commentaires au dataDetails
                        comments: '$comments',
                        favourites: '$favourites'
                    }
                ]
            }
        }
    },
      {
        $sort: { 'notifications.updatedAt': -1 } // Trier par le champ 'updatedAt' dans 'notifications'
      },
      {
        $skip: skip // Sauter les documents pour la pagination
      },
      {
        $limit: limit // Limiter le nombre de documents retournés
      }
    ];

    /*
      {
            $match: {
              user: new mongoose.Types.ObjectId(req.params.user), // Assurez-vous que le user est un ObjectId
            }
        },
    */
    
    try 
    {
        const results = await Notification.aggregate(pipeline).exec();

        results.map(result => {
            
        })

        const totalDatas = await Notification.countDocuments({ user: new mongoose.Types.ObjectId(req.params.user) }).exec();
        const totalPages = Math.ceil(totalDatas / limit);
        
        res.status(200).json({
          notifications: results.map(el => el.notifications), // Extraire les notifications des résultats
          page: page,
          totalPages: totalPages,
          totalDatas: totalDatas
        });
    } catch (error) {
        console.error("Erreur lors de l'agrégation : ", error);
        return res.status(500).json({
          success: false,
          message: 'Une erreur est survenue lors du traitement des données.',
          error: error.message
        });
    }       
};






