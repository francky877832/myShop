const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const userRoutes = require('./routes/userRoutes.js');
const bodyParser = require('body-parser');


const app = express();
mongoose.connect("mongodb+srv://jira:Jiraat0000@jcluster.12d75yf.mongodb.net/?retryWrites=true&w=majority&appName=JCluster")
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/datas', appRoutes);
app.use('/api/auth', appRoutes);


module.exports = app;
