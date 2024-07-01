const fs = require('fs');
const User = require('../models/userModel')
const Product = require('../models/productModel');



exports.addProductUser = (req, res, next) => {
  console.log("ok");
  const datas = JSON.parse(req.body.product);
  delete datas._id;
  delete datas.seller;

  const imageFiles = req.files
  let imageNames = imageFiles.map((file)=> {return `${req.protocol}://${req.get('host')}/userApp/assets/images/${file.filename}`})
  
  const product = new Product(
    {
      ...datas,
      seller : datas.seller, //req.auth.userId
      images : imageNames,
    })

  product.save()
  .then(
    () => {
      res.status(200).json({ message: "Produit cree avec success" });
    })
  .catch(
    (error) => {
      console.log("error")
      res.status(400).json({ error: "trop erreur?" });
    }
  );
};



exports.updateProduct = (req, res, next) => {
  const product = req.file ? {
        ...JSON.parse(req.body.product),
        imageUrl: `${req.protocol}://${req.get('host')}/userApp/assets/images/${req.file.filename}`
     } : { ...req.body };
  const datas = req.body
  delete datas._id
  delete datas.seller

//if product.seller eq auth.user
  Product.updateOne({ _id : req.params.id }, product)
  .then( () => { 
      res.status(200).json({ message: 'Produit mis a jour avec success' });
  })
  .catch( (error) => { 
      res.status(400).json({error: error});
   });
};


exports.updateProductVisibility = (req, res, next) => {
  const datas = req.body 
  Product.updateOne({ _id : req.params.id }, { visibility : datas.visibility })
  .then( () => { 
      res.status(200).json({ message: 'Visibilite du roduit mis a jour avec success' });
  })
  .catch( (error) => { 
      res.status(400).json({error: error});
   });
};




exports.removeProduct  = (req, res, next) => {
  const datas = req.body 

  Product.find({ _id : req.params.id })
  .then( (product) => {
//controle de securite
      for(let i in product.images)
      {
          const filename = product.images[i].split('/images/')[1];
          s.unlink(`./userApp/assets/images/${filename}`, () => {})
      }

      Product.deleteOne({ _id : req.params.id })
      .then( () => { 
        res.status(200).json({ message: 'Produit supprime avec succes.'});
      })
      .catch( (error) => { 
        res.status(400).json({ error: error });
      });
   })
  .catch( (error) => { 
      res.status(400).json({ error: error });
   });
};

exports.getProducts = (req, res, next) => {
  Product.find()
  .then( (products) => {
      res.status(200).json({products, message : "ok"});
      
  })
  .catch( (error) => {
      res.status(400).json({ error: error});
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

exports.getProductsFromCategories  = (req, res, next) => {
  const datas = req.body 
  Product.find({ category : { $in : datas.category } })
  .then( (products) => { 
    console.log(products)
      res.status(200).json(products);
   })
  .catch( (error) => { 
      res.status(400).json({ error: error });
   });
};

exports.getProductsWithUserInfo = (req, res, next) => {
  Product.find()
    .populate('seller', '_id')
    .then((products) => {
      // Récupérer les ObjectId des vendeurs
      const sellerIds = products.map(product => product.seller._id);
      console.log('ok1')
      // Récupérer les informations des utilisateurs à partir de leurs ObjectId
      User.find({ _id: { $in: sellerIds } }, 'name email')
        .then(users => {
          // Créer un objet avec les informations des utilisateurs
          const userInfo = users.reduce((acc, user) => {
            acc[user._id.toString()] = { name: user.name, email: user.email };
            return acc;
          }, {});
          // Ajouter les informations des utilisateurs à la réponse
          const response = {
            products: products.map((product) => ({
              id: product._id,
              name: product.name,
              price: product.price,
              seller: {
                name: userInfo[product.seller._id.toString()].name,
                email: userInfo[product.seller._id.toString()].email
              }
            })),
            message: "all good"
          };

          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//Cest mieux de gerer cette fonctionnalite cote backend
exports.getUserProductsFromCategory  = (req, res, next) => {
  const datas = req.body 
  Product.find({ user : datas.user, category : datas.category })
  .then( (products) => { 
      res.status(200).json(products);
   })
  .catch( (error) => { 
      res.status(400).json({ error: error });
   });
};



//Search products by names, category
//historique de recherhce
//resultats de recherches, puis avec filtres
exports.getSearchedProducts = (req, res, next) => {
  const datas = req.body 
  let filters = {};
  if(datas.name)
  {
    filters = { ...filters, name : { $regex: new RegExp(".*"+datas.name+".*", 'i') }}
  }

  if(datas.category)
  {
    filters = { ...filters, category : datas.category }
  }

  if(datas.price)
  {
    filters = { ...filters, price : {$gte : datas.minPrice, $lte : datas.maxPrice }, }
  }

  if(datas.condition)
  {
    filters = { ...filters, condition : datas.condition }
  }

  if(datas.feesBy)
  {
      filters = { ...filters,   feesBy : datas.feesBy }
  }
  Product.find(filters)
  .then( (products) => {
      res.status(200).json(products);
  })
  .catch( (error) => {
      res.status(400).json({ error: error });
  });
};


exports.getProductNumLikes  = (req, res, next) => {
  Product.findOne({ _id : req.params.id })
      .then( (product) => { 
          res.status(200).json(product.likes);
      })
      .catch( (error) => { 
          res.status(400).json({ error: error });
      });
};

exports.updateProductNumLikes  = (req, res, next) => {
  Product.updateOne({ _id : req.params.id }, { $inc : { likes : datas.updateLikes } } )
      .then( () => { 
          res.status(200).json({ message : (datas.updateLikes==1) ? "Le produit a recu un nouveau like." : "Le produit a perdu un like." });
      })
      .catch( (error) => { 
          res.status(400).json({ error: error });
      });
};


