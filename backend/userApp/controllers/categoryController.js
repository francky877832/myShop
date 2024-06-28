const Category = require('../models/categoryModel')

exports.addCategory = (req, res, next) => {
    console.log("ok");
    const datas = JSON.parse(req.body.category);
    delete datas._id;
    delete datas.name;
  
    const category = new Category(
      {
        ...datas,
        seller : datas.name, //req.auth.userId
      })
  
      category.save()
    .then(
      () => {
        res.status(200).json({ message: "categorie cree avec success" });
      })
    .catch(
      (error) => {
        console.log("error")
        res.status(400).json({ error: "trop erreur?" });
      }
    );
  };

  exports.getcategory =(req,res,next) => {
    Category.find()
    .then(res.status(200).json({message:"",Category}))
    .catch((error)=>{
      console.log(error)
      res.status(400).json({error:error});
    })
  }