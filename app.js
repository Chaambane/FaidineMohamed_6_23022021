const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();


mongoose.connect('mongodb+srv://chaambane:So_Pekocko@cluster0.pmz2j.mongodb.net/chaambane?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); // on parse les données reçue pour pouvoir les éxploités. 


app.use('api/sauce', sauceRoutes); // Passage de toutes les requêtes.
app.use('/api/auth', userRoutes);

module.exports = app;