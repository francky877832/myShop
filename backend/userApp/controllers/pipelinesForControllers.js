const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;

exports.getPipeLineForProducts = ( userId=undefined, skip, limit, sort={_id:1} ) => {
    let match;
    if(userId) 
    {
      match = { seller: new mongoose.Types.ObjectId(userId)}
    }
    else
    {
      match = { sold : 0, visibility : 1} //on recupere les produit non vendu et visible
    }
  const pipeline = [
    ...(userId ? [{
        $match: match
    }] : []),
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


exports.getPipeLineForOffers = ( seller, buyer, product ) => {
    
    const pipeline = [

        {
            $match: {
                seller: new mongoose.Types.ObjectId(seller),
                buyer: new mongoose.Types.ObjectId(buyer),
                product: new mongoose.Types.ObjectId(product),
            }
        },
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
      {
        $lookup: {
          from: 'users',
          localField: 'product.favourites',
          foreignField: '_id',
          as: 'product.favourites'
        }
      },
      { $unwind: '$product.favourites' },
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
      }
    ];
    return pipeline
  }
