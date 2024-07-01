const faker = require('faker');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

exports.seedProducts = async (req, res, next) => {
  try {
    // Récupérer tous les ObjectId des utilisateurs
    const users = await User.find({}, { _id: 1 });
    const userIds = users.map(user => user._id);
    
    // Récupérer tous les ObjectId des catégories
    const categories = await Category.find({}, { _id: 1 });
    const categoryIds = categories.map(category => category._id);
    
    // Créer 10 nouveaux produits
    const products = [];
    for (let i = 0; i < 10; i++) {
      try {
        const product = await Product.create({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          newPrice: parseFloat(faker.commerce.price()),
          minPrice: parseFloat(faker.commerce.price()),
          maxPrice: parseFloat(faker.commerce.price()),
          condition: faker.random.arrayElement(['new', 'used']),
          seller: faker.random.arrayElement(userIds),
          category: faker.random.arrayElement(categoryIds), // Utiliser une catégorie existante
          brand: faker.company.companyName(),
          color: [faker.commerce.color(), faker.commerce.color()],
          images: [
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl()
          ],
          feesBy: faker.random.arrayElement(['buyer', 'seller']),
          warranty: faker.datatype.number({ min: 1, max: 5 }),
          stock: faker.datatype.number({ min: 0, max: 100 }),
          likes: faker.datatype.number({ min: 0, max: 1000 }),
          inBasket: faker.datatype.number({ min: 0, max: 50 }),
          sold: faker.datatype.number({ min: 0, max: 1 }),
          visibility: faker.datatype.number({ min: 0, max: 1 }),
          createdAt: faker.date.past(),
          updatedAt: faker.date.between('2023-01-01', '2024-06-30'),
        });
        products.push(product);
      } catch (error) {
        // Traiter les erreurs de validation individuellement
        console.error(`Error creating product ${i}: ${error.message}`);
      } 
    }

    res.status(201).json({ message: 'Products created', products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};