const express = require('express');
const {connectDB, mongoose} = require('../shared/db');
const routes = require('./routes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();

connectDB()

app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//console.log('Ok')

app.use('/api/auth', userRoutes);

const imagesPath =  path.join(__dirname, '/assets/images').replace(/\\/g, '/')
app.use('/api/datas', routes);
//console.log( path.join(__dirname, '/assets/images').replace(/\\/g, '/'))
app.use('/userApp/assets/images', express.static(path.join(__dirname, '/assets/images').replace(/\\/g, '/')))

app.get('/userApp/assets/images/:imageName', (req, res) => {
  res.sendFile(path.join(imagesPath, req.params.imageName));
});



app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.type('application/json');
  res.sendFile(path.join(__dirname, '.well-known', 'apple-app-site-association'));
});

// Route pour assetlinks.json
app.get('/.well-known/assetlinks.json', (req, res) => {
  res.type('application/json');
  res.sendFile(path.join(__dirname, '.well-known', 'assetlinks.json'));
});



module.exports = app;
