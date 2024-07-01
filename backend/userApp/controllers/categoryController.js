const Category = require('../models/categoryModel')

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({ message: 'Voici les catégories', categories });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories' });
    });
};
exports.addCategory = (req, res, next) => {
  // Vérifier les erreurs de validation
  const { name, description } = req.body;
  const category = new Category({
    name,
    description,
  });
  category
    .save()
    .then(() => {
      res.status(201).json({ message: 'Catégorie créée avec succès', category });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de la catégorie' });
    });
};

  exports.updateCategory = (req, res, next) => {
    Category.updateOne({ _id : req.params.id }, { status : req.body.name })
    .then( () => { 
        res.status(200).json({ message: `Category mis a jour avec succes : ${req.body.name}` });
    })
    .catch( (error) => { 
        res.status(400).json({error: error});
     });
  };

  exports.removeCategory = (req, res, next) => {
    Category.deleteOne({ _id : req.params.id })
    .then( () => { 
        res.status(200).json({ message: `Order deleted successfully.` });
    })
    .catch( (error) => { 
        res.status(400).json({error: error});
     });
  };


  exports.addMultipleCategories = (req, res, next) => {
    try {
      const { categories } = req.body;
  
      // Vérifier si "categories" est un tableau
      if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ error: 'Le champ "categories" doit être un tableau non vide' });
      }
  
      // Créer et sauvegarder les catégories
      Promise.all(
        categories.map((category) => {
          const newCategory = new Category({
            name: category.name,
            description: category.description,
          });
          return newCategory.save();
        })
      )
        .then((savedCategories) => {
          res.status(201).json({ message: 'Catégories créées avec succès', categories: savedCategories });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Une erreur est survenue lors de la création des catégories' });
        });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erreur de format JSON dans les données de la requête' });
    }
  };
 