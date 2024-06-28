const Product = require('../models/productModel')


emptyProduct = () =>{
   
        Product.deleteMany({});
        console.log(Product,"is empty")
        return Product
  
}

module.exports = emptyProduct;