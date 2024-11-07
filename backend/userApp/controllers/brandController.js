const fs = require('fs');

const Brand = require('../models/brandModel');


exports.getBrands = (req, res, next) => {
    Brand.find()
    .then( (brands) => {
        res.status(200).json(brands);
    })
    .catch( (error) => {
        res.status(400).json({ error: error});
    });
  };

  


