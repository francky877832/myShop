const express = require('express');
const {connectDB, mongoose} = require('../shared/db');
const routes = require('./routes');
const path = require('path');
const userRoutes = require('./routes/userRoutes.js');
const bodyParser = require('body-parser');
// const seeding = require('./seed/seedUsers.js');
const productSeeding = require('./seed/seedProducts');


const app = express();

connectDB()
// productSeeding()
// seeding()
app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//faker 



app.use('/api/datas', routes);
app.use('/assets/images', express.static(path.join(__dirname, 'userApp/assets/imagesimages')));
app.use('/api/auth', userRoutes);


module.exports = app;
