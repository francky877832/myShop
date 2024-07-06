const fs = require('fs');

const Category = require('../models/CategoryModel');


exports.getCategories = (req, res, next) => {
    Category.find()
    .sort({no : 1})
    .then( (categories) => {
       
        res.status(200).json(categories);
    })
    .catch( (error) => {
        res.status(400).json({ error: error});
    });
  };

  


