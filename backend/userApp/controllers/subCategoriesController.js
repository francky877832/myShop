const SubCategories = require('../models/subCategoriesModel')

exports.getSubCategories = (req, res, next) => {
    SubCategories.find()
      .then((subCategories) => {
        res.status(200).json({ message: 'Voici les catégories', subCategories });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories' });
      });
  };
  exports.addSubCategories = (req, res, next) => {
    const { name, description } = req.body;
    
    const subcategories = new SubCategories({
      name,
      description,
    });
    subcategories
      .save()
      .then(() => {
        res.status(201).json({ message: 'Catégorie créée avec succès', subcategories });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la catégorie' });
      });
  };
  