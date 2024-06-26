const {connectDB, mongoose} = require('../db/db.js');
const User = require('../models/userModel.js');
const faker = require('faker');


const  seedDB = async () => {
    connectDB()
    for (let i = 0 ; i < 100 ; i++){
        const user = new User({
            email: faker.internet.email(),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        })
        await user.save();
    }
    console.log('BD peuplee avec success')
   }

   module.exports = seedDB;