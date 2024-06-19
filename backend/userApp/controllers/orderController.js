const Order = require('../models/orderModel');


exports.addOrderUser = (req, res, next) => {

    const order = new Order({
        seller : req.body.seller,
        buyer : req.body.buyer,
        products : req.body.products,
        totalPrice : req.body.totalPrice,
        quantity : req.body.quantity,
        shippingAddress : {street : req.body.shippingAddress.street, city : req.body.shippingAddress.city, country : req.body.shippingAddress.country }
    })
    order.save()
    .then( () => {
        res.status(200).json({ message: "Order placed successfully." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};


exports.updateOrderUser = (req, res, next) => {
    Order.updateOne({ _id : req.params.id }, { status : req.body.status })
    .then( () => { 
        res.status(200).json({ message: `Order mis a jour avec succes : ${req.body.status}` });
    })
    .catch( (error) => { 
        res.status(400).json({error: error});
     });
  };

  exports.removeOrderUser = (req, res, next) => {
    Order.deleteOne({ _id : req.params.id })
    .then( () => { 
        res.status(200).json({ message: `Order deleted successfully.` });
    })
    .catch( (error) => { 
        res.status(400).json({error: error});
     });
  };


  exports.getOrderUser  = (req, res, next) => {
    Order.find({ $or : [{ seller : req.params.user }, { buyer : req.params.user }] })
    .then( (orders) => { 
        res.status(200).json(orders);
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };
  
  


