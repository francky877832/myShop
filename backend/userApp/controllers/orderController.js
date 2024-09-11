const Order = require('../models/orderModel');
const GroupOrder = require('../models/groupOrderModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.../../shared/.env' });


exports.updatePaymentStatus = async (req, res, next) => {
    const {
      status,
      reference,
      amount,
      currency,
      operator,
      code,
      operator_reference,
      signature,
      endpoint,
      external_reference,
      external_user,
      extra_first_name,
      extra_last_name,
      extra_email,
      phone_number
    } = req.query;
  
    try {
      const decoded = jwt.verify(signature, process.env.CAMPAY_WEBHOOK_KEY);
      //console.log("Signature valide:", decoded);
      
      if (status === 'SUCCESSFUL') {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id:   new mongoose.Types.ObjectId(external_reference) },  
          { paymentStatus: 'payment_successfull' },
          { paymentDetails : operator.toLwerCase() },    
          { new: true }              
        );
  
        if (updatedOrder) {
          return res.status(200).json({ success: true, message: 'Order updated successfully', order: updatedOrder });
        } else {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
      } else if (status === 'FAILED') {
        const deletedOrder = await Order.findOneAndDelete({ group: new mongoose.Types.ObjectId(external_reference) });
        const deletedGroupOrder = await Order.findOneAndDelete({ _id: new mongoose.Types.ObjectId(external_reference) });
  
        if (deletedOrder && deletedGroupOrder) {
          return res.status(200).json({ success: true, message: 'Order deleted due to payment failure', deletedOrder: deletedOrder, deletedGroupOrder:deletedGroupOrder });
        } else {
          return res.status(404).json({ success: false, message: 'Order not found for deletion' });
        }
      } else {
        return res.status(400).json({ success: false, message: 'Invalid status received' });
      }
    } catch (error) {
      console.error('Signature JWT invalide', error);
      res.status(400).send('Invalid signature');
    }
}

exports.addUserOrder = async (req, res, next) => {
  const { group, order } = req.body;

  if (!group || !order) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  //const session = await mongoose.startSession();
  //session.startTransaction();

  try {
    const shippingAddress = {
      quater: group.shippingAddress.quater,
      title: group.shippingAddress.title,
      city: group.shippingAddress.city,
      country: group.shippingAddress.country
    };

    const group_order = {
      no: group.no,
      read: 0,
      phone: group.phone,
      totalPrice: group.totalPrice,
      quantity: group.quantity,
      shippingAddress: shippingAddress
    };

    const newOrderGroup = await GroupOrder.create({ ...group_order }); //session

    const new_order = {
      group: new mongoose.Types.ObjectId(newOrderGroup._id),
      sellers: order.sellers.map(seller => new mongoose.Types.ObjectId(seller)),
      buyer: order.buyer,
      products: order.products.map(product => ({product : new mongoose.Types.ObjectId(product.product)})),
      totalPrice: order.totalPrice,
      quantity: order.quantity
    };

    // Assure-toi que Order est bien défini et connecté à MongoDB
    const newOrder = await Order.create({ ...new_order}); //session

    //await session.commitTransaction();
    //session.endSession();
    return res.status(200).json({ newOrderGroup: newOrderGroup, newOrder: newOrder });

  } catch (error) {
    console.error("Transaction Error:", error); // Ajoute une sortie pour le débogage
    //await session.abortTransaction();
    //session.endSession();
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  } finally {
    /*if (session.inTransaction()) {
      await session.abortTransaction(); // Assure-toi que la transaction est annulée si une exception se produit
    }
    session.endSession();*/
  }
};






exports.updateOrderStatus  = async (req, res, next) => {
    const {product, status } = req.body; // Les données envoyées dans la requête
  
    try {
      // Vérifie que le statut est valide
      if (!['pending', 'shipped', 'delivered'].includes(status)) {
        return res.status(400).json({ message: 'Statut invalide' });
      }
  
      // Trouve la commande et met à jour le statut du produit
      const order = await Order.findOneAndUpdate(
        { _id:  new mongoose.Types.ObjectId(req.params.id), 'products.product': new mongoose.Types.ObjectId(product) },
        {
          $set: {
            'products.$.status': status,
            updatedAt: Date.now() // Met à jour la date de mise à jour
          }
        },
        { new: true, runValidators: true } // Retourne le document mis à jour
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Commande ou produit non trouvé' });
      }
  
      // Répond avec la commande mise à jour
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur du serveur', error });
    }
  };

exports.updateOrderRead = async (req, res, next) => {
    const { product } = req.body; // Les données envoyées dans la requête
  console.log("product")
    try {
  
      const order = await Order.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.id), 'products.product':  new mongoose.Types.ObjectId(product) },
        {
          $set: {
            'products.$.read': 1,
            updatedAt: Date.now() // Met à jour la date de mise à jour
          }
        },
        { new: true, runValidators: true } // Retourne le document mis à jour
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Commande ou produit non trouvé' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur du serveur', error });
    }
};
  




  exports.removeOrderUser = (req, res, next) => {
    Order.deleteOne({ _id : new mongoose.Types.ObjectId(req.params.id)  })
    .then( () => { 
        res.status(200).json({ message: `Order deleted successfully.` });
    })
    .catch( (error) => { 
        res.status(400).json({error: error});
     });
  };

/*
  exports.getOrderUser  = (req, res, next) => {
    Order.find({ $or : [{ seller : req.params.user }, { buyer : req.params.user }] })
    .then( (orders) => { 
        res.status(200).json(orders);
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };
*/

exports.getUserOrders = async (req, res, next) => {
    console.log("ORDERS")
  const userId = req.params.user;
  const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
  const limit = parseInt(req.query.limit) || 100; // Nombre d'éléments par page, par défaut 3
  const skip = (page - 1) * limit;

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          $or: [
            { sellers: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } } },
            { buyer: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      
      {$unwind : '$sellers'},
      {
        $lookup: {
          from: 'users',
          localField: 'sellers',
          foreignField: '_id',
          as: 'sellers'
        }
      },
      {$unwind : '$sellers'},
      {
        $lookup: {
          from: 'users',
          localField: 'sellers.followers',
          foreignField: '_id',
          as: 'sellers.followers'
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'sellers.followings',
          foreignField: '_id',
          as: 'sellers.followings'
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'sellers.favourites',
          foreignField: '_id',
          as: 'sellers.favourites'
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
      {
        $unwind: {
          path: '$buyer',
          preserveNullAndEmptyArrays: true
        }
      },
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
        $unwind: '$products' 
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'products.product'
        }
      },

      {
        $addFields: {
                'products.product':  {
                $arrayElemAt: [`$products.product`, 0]
            }
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'products.product.seller',
          foreignField: '_id',
          as: 'seller'
        }
      },
      {
        $unwind: {
          path: '$seller',
          preserveNullAndEmptyArrays: true
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
          localField: 'products.product.favourites',
          foreignField: '_id',
          as: 'favourites'
        }
      },


      {
        $lookup: {
          from: 'grouporders',
          localField: 'group',
          foreignField: '_id',
          as: 'group'
        }
      },
      {
        $addFields: {
                'group':  {
                $arrayElemAt: [`$group`, 0]
            }
        }
      },


   
      {
        $lookup: {
          from: 'comments',
          let: { productId: '$products.product._id' },
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
          'sellers' : {
            $mergeObjects : [
              '$sellers',
              {
                followers: { $ifNull: ['$sellers.followers', []] },
                followings: { $ifNull: ['$sellers.followings', []] },
                favourites: { $ifNull: ['$sellers.favourites', []] }
              }
            ]
          },
            'products.product': {
                $mergeObjects: [
                    '$products.product', // Conserver les détails existants
                    {
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
        $sort: { 'products.updatedAt': -1 } // Trier par le champ 'updatedAt' dans 'notifications'
      },
      {
        $skip: skip // Sauter les documents pour la pagination
      },
      {
        $limit: limit // Limiter le nombre de documents retournés
      },
      {
        $group: {
          _id: "$_id", 
          //sellers: { $push: "$sellers" }, 
          //products: { $push: "$products" }, 
          sellers: { $addToSet: "$sellers" },
          products: { $addToSet: "$products" },
          // Fusionner tous les autres champs du document original
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [ "$doc", { products: "$products", sellers:"$sellers" } ] }
        }
      }
    
    ]);

    const totalDatas = await Order.countDocuments({  $or: [
        { sellers: new mongoose.Types.ObjectId(userId) },
        { buyer: new mongoose.Types.ObjectId(userId) }
      ] }).exec();

        const totalPages = Math.ceil(totalDatas / limit);


       

      const sold_products = [] //orders.flatMap((item)=> { return {...item, seller:userId, products : item.products.filter((el) => el.product?.seller?._id == userId && item.buyer._id != userId)}})
      const bought_products =  orders.filter((item) => item.buyer._id == userId)
      for(let order of orders)
      {
        let products = []
        for(let product of order.products)
        {
          if(product.product.seller._id == userId)
          {
            products.push(product)
          }
        }
        if(products.length > 0)
          sold_products.push({...order, products : products })
          
      }
      
      //orders.flatMap((item)=> { return {...item, products : item.products.filter((el) => el.product?.seller?._id != userId)}} )
//REGROUPER LES PRDUIT SUIVANT DES GROUPORDERS
       res.status(200).json({
          orders: orders, // results[0], //{...orders[0], products:results[0]},
          sold : sold_products,
          bought : bought_products,
          page: page,
          totalPages: totalPages,
          totalDatas: totalDatas,
          sold_count : sold_products.length,
          bought_count : bought_products.length
        });

  } catch (error) {
    console.error('Erreur lors de la récupération des commandes pour l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
};


  
  


