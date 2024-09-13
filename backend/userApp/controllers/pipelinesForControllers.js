const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;

exports.getPipeLineForProducts = ( userId=undefined, skip=0, limit=100, sort={_id:1}, userId2=undefined ) => {
    let match; //console.log(userId2)
    if(userId) 
    {
      match = { seller: new mongoose.Types.ObjectId(userId), }
    }
    else
    {
      match = { seller:{$ne: new mongoose.Types.ObjectId(userId2)}, sold : 0, visibility : 1} //on recupere les produit non vendu et visible
    }
    //const match2 = userId2 ? { buyer : new mongoose.Types.ObjectId(userId), } : {}
  const pipeline = [
    /*...(userId ? [{
        $match: match
    }] : []),*/
     {$match: match},
    { $sort: sort }, 
    { $skip: skip }, 

    ...(limit!=0 ? [
      { $limit: limit }
   ] : []),
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
    
    ...(userId2 ? [{
        $lookup: {
          from: "offers", 
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$product", "$$productId"] }, // Jointure sur le produit
                    { $eq: ["$buyer", new mongoose.Types.ObjectId(userId2)] }
                  ]
                }
              }
            },
           
          ],
          as: "offers" // Stocker les offres dans ce champ
        }
    }] : []),


    
    {
        $lookup: {
          from: 'users',
          localField: 'favourites',
          foreignField: '_id',
          as: 'favourites'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favourites.followers',
          foreignField: '_id',
          as: 'favouritesFollowers'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favourites.followings',
          foreignField: '_id',
          as: 'favouritesFollowings'
        }
      },
      {
        $addFields: {
          offers: {
            $cond: {
              if: { 
                $gt: [{ $size: { $ifNull: ['$offers', []] } }, 0]
              },
              then: { $arrayElemAt: ['$offers', 0] },
              else: {}
            }
          },
          favourites: {
            $map: {
              input: '$favourites',
              as: 'favourite',
              in: {
                $mergeObjects: [
                  '$$favourite',
                  {
                    followers: {
                      $filter: {
                        input: '$favouritesFollowers',
                        as: 'follower',
                        cond: { $eq: ['$$follower._id', '$$favourite._id'] }
                      }
                    },
                    followings: {
                      $filter: {
                        input: '$favouritesFollowings',
                        as: 'following',
                        cond: { $eq: ['$$following._id', '$$favourite._id'] }
                      }
                    }
                  }
                ]
              }
            }
          }
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


exports.getPipeLineForOffers = ( match, skip=0, limit=0 ) => {
    
    const pipeline = [

        {
            $match: match
        },
        { $skip: skip }, 

        ...(limit!=0 ? [
          { $limit: limit }
       ] : []),
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
        from: 'users',
        localField: 'buyer',
        foreignField: '_id',
        as: 'buyer'
    }
  },
  
  { $unwind: '$buyer' }, // Décomposer le tableau seller en objets individuels
  {
    $lookup: {
      from: 'users',
      localField: 'buyer.followers',
      foreignField: '_id',
      as: 'buyer.followers'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'buyer.followings',
      foreignField: '_id',
      as: 'buyer.followings'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'buyer.favourites',
      foreignField: '_id',
      as: 'buyer.favourites'
    }
  },



      
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      /*{
        $lookup: {
          from: 'users',
          localField: 'product.favourites',
          foreignField: '_id',
          as: 'product.favourites'
        }
      },
      //{ $unwind: {path :'$product.favourites', preserveNullAndEmptyArrays: true} },
      {
        $lookup: {
          from: 'users',
          localField: 'product.favourites.followers',
          foreignField: '_id',
          as: 'product.favourites.followers'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'product.favourites.followings',
          foreignField: '_id',
          as: 'product.favourites.followings'
        }
      },*/

      {
        $lookup: {
          from: 'users',
          localField: 'product.favourites',
          foreignField: '_id',
          as: 'favourites'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favourites.followers',
          foreignField: '_id',
          as: 'favouritesFollowers'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favourites.followings',
          foreignField: '_id',
          as: 'favouritesFollowings'
        }
      },
      {
        $addFields: {
          'product.favourites': {
            $map: {
              input: '$favourites',
              as: 'favourite',
              in: {
                $mergeObjects: [
                  '$$favourite',
                  {
                    followers: {
                      $filter: {
                        input: '$favouritesFollowers',
                        as: 'follower',
                        cond: { $eq: ['$$follower._id', '$$favourite._id'] }
                      }
                    },
                    followings: {
                      $filter: {
                        input: '$favouritesFollowings',
                        as: 'following',
                        cond: { $eq: ['$$following._id', '$$favourite._id'] }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        
      },





      


      {
        $lookup: {
          from: 'comments',
          let: { productId: '$product._id' },
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
        $addFields : {
          'product.comments' : '$comments',
          'product.seller' : '$seller',
        }
      }

      
    


    ];
    return pipeline
  }


exports.getPipeLineForavouritesAndBasket = ( userId, skip=0, limit=0,) => {
  const pipeline = [
    {
      $match: { user : new ObjectId(userId) },
    },
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $unwind: '$productDetails'
    },
    
    /*
    
    // 6. Joindre avec la collection 'users' pour obtenir les détails des utilisateurs qui ont aimé les produits
    {
      $lookup: {
        from: 'users',
        localField: 'productDetails.favourites',
        foreignField: '_id',
        as: 'favouriteUsers'
      }
    },
    // 7. Décomposer le tableau des utilisateurs qui ont aimé les produits
    {
      $unwind: '$favouriteUsers'
    },
    // 8. Joindre avec la collection 'users' pour obtenir les followers des utilisateurs qui ont aimé les produits
    {
      $lookup: {
        from: 'users',
        localField: 'favouriteUsers.followers',
        foreignField: '_id',
        as: 'favouriteUsersFollowers'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'favouriteUsers.followings',
        foreignField: '_id',
        as: 'favouriteUsersFollowings'
      }
    },*/

    {
      $lookup: {
        from: 'users',
        localField: 'productDetails.favourites',
        foreignField: '_id',
        as: 'favourites'
      }
    },
    
    {
      $lookup: {
        from: 'users',
        localField: 'favourites.followers',
        foreignField: '_id',
        as: 'favouritesFollowers'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'favourites.followings',
        foreignField: '_id',
        as: 'favouritesFollowings'
      }
    },


   

    {
      $lookup: {
        from: 'users',
        localField: 'productDetails.seller',
        foreignField: '_id',
        as: 'productSeller'
      }
    },
    // 10. Décomposer le tableau des vendeurs pour chaque produit
    {
      $unwind: '$productSeller'
    },
    // 11. Joindre avec la collection 'users' pour obtenir les followers des vendeurs
    {
      $lookup: {
        from: 'users',
        localField: 'productSeller.followers',
        foreignField: '_id',
        as: 'productSellerFollowers'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'productSeller.followings',
        foreignField: '_id',
        as: 'productSellerFollowings'
      }
    },

    
    /*{
      $unwind: '$productDetails.favourites'
    },
    {
      $lookup: {
        from: 'users',
        localField: 'productDetails.favourites',
        foreignField: '_id',
        as: 'favourites'
      }
    },
    
    {
      $lookup: {
        from: 'users',
        localField: 'favourites.followers',
        foreignField: '_id',
        as: 'favouritesFollowers'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'favourites.followings',
        foreignField: '_id',
        as: 'favouritesFollowings'
      }
    },
    */

    
    {
      $lookup: {
        from: "offers", 
        let: { productId: "$productDetails._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$product", "$$productId"] }, // Jointure sur le produit
                  { $eq: ["$buyer", new mongoose.Types.ObjectId(userId)] }
                ]
              }
            }
          },
    
        ],
        as: "offers" // Stocker les offres dans ce champ
      }
    },
    {
      $addFields: {
        offers: {
          $cond: {
            if: { 
              $gt: [{ $size: { $ifNull: ['$offers', []] } }, 0]
            },
            then: { $arrayElemAt: ['$offers', 0] },
            else: {}
          }
        },
      }
    },
       

    {
      $lookup: {
        from: 'comments',
        let: { productId: '$productDetails._id' }, // Utiliser l'ID du produit détaillé
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
          { $unwind: '$user' }, // Décomposer le tableau user en objets individuels
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
      $group: {
        _id: '$_id',
        user: { $first: '$user' },
        username: { $first: '$username' },
        products: { $push: '$products' },
        productDetails: {
          $push: {
            $mergeObjects: [
              '$productDetails',
              {
                favourites: {
                  $map: {
                    input: '$favourites',
                    as: 'fav',
                    in: {
                      $mergeObjects: [
                        '$$fav',
                        {
                          followers: {
                            $filter: {
                              input: '$favouritesFollowers',
                              as: 'follower',
                              cond: { $in: ['$$follower._id', '$$fav.followers'] }
                            }
                          },
                          followings: {
                            $filter: {
                              input: '$favouritesFollowings',
                              as: 'following',
                              cond: { $in: ['$$following._id', '$$fav.followings'] }
                            }
                          }
                        }
                      ]
                    }
                  }
                },

                seller: {
                  $mergeObjects: [
                    '$productSeller',
                    {
                      followers: {
                        $filter: {
                          input: '$productSellerFollowers',
                          as: 'follower',
                          cond: { $in: ['$$follower._id', '$productSeller.followers'] }
                        }
                      },
                      followings: {
                        $filter: {
                          input: '$productSellerFollowings',
                          as: 'following',
                          cond: { $in: ['$$following._id', '$productSeller.followings'] }
                        }
                      }
                    }
                  ]
                }
              },
              { 
                offers: { $arrayElemAt: ['$productOffers', 0] } 
              },
              { offers: '$offers' },
              { comments: '$comments' }
            ]
          }
        }
      }
    },

    
    
  ]
  return pipeline
}
