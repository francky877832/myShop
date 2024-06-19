const Complaint = require('../models/complaintModel');

//Un admin annalyse la complainte, evoie une notif a from sil ya rien et
//une notif aux deux si le produit viole les regles et supprime le produit - removeProduct
exports.addUserComplaint = (req, res, next) => {
    const complaint = new Complaint({
        from : req.body.from,
        to : req.body.to,
        product : req.body.product,
        message : req.body.message,
    })
    complaint.save()
    .then( () => {
        res.status(200).json({ message: "Votre plainte a ete recu avec succes." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};


exports.getUserComplaints = (req, res, next) => {
    Complaint.find()
    .then( (complaint) => {
        res.status(200).json(complaint);
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};
  
  exports.getProduct  = (req, res, next) => {
    Product.findOne({ _id : req.params.id })
    .then( (product) => { 
        res.status(200).json(product);
     })
    .catch( (error) => { 
        //res.end("erreur");
        res.status(400).json({ error: error, message : "go" });
     });
  };



