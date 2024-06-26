    const {connectDB, mongoose} = require('../db/db.js');
    const Product = require('../models/productModel');
    const faker = require('faker');
    // const Schema = mongoose.Schema
    const User = require('../models/userModel.js');
    const Category = require('../models/categoryModel.js');
    // const Seller = require('../models/us')


    const feesOption = ['seller', 'buyer'];
    const conditionOptions = ['new', 'used'];
    const soldOptions = [0, 1];
    const visibilityOptions = [0, 1];

    const sellerId =  User.find();
    const categoryId = Category.find();

    const  seedProduct = async () => {
        console.log(sellerId)
        // try{
        //     await connectDB()
        //     for (let i = 0 ; i < 100 ; i++){
        //         const product = new Product({
        //             description: faker.lorem.paragraph(),
        //             name: faker.commerce.productName(),
        //             price: faker.commerce.price(),
        //             seller: faker.helpers.randomize(sellerId),
        //             condition: faker.helpers.randomize(conditionOptions),
        //             category:  faker.helpers.randomize(categoryId),
        //             brand: faker.company.companyName(),
        //             color: faker.commerce.color(),
        //             image: faker.image.imageUrl(),
        //             feesBy: faker.helpers.randomize(feesOption),
        //             guarantee: faker.date.future().toISOString().slice(0,10),
        //             stock: faker.random.number({min:1,max:100}),
        //             likes: faker.random.number({min:0,max:1000000}),
        //             inBasket: faker.random.number({min:0,max:50}),
        //             sold: faker.helpers.randomize(soldOptions),
        //             visibility: faker.helpers.randomize(visibilityOptions)
    
        //         })
        //         await product.save();
        // }
        // console.log('product peuplee avec success')
        
        // } catch (error) {
        //     console.error('Error seeding products:', error);
        // }
        
    }

    module.exports = seedProduct;