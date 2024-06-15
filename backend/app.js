const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
mongoose.connect('mongodb+srv://jimbob:Jiraat0000@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use('/api/datas', appRoutes);
app.use('/api/auth', appRoutes);

module.exports = app;
