const express = require('express');
const helmet = require('helmet'); // sécurité des headers
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


const app = express();
app.use(helmet()); // Sécurisation en-têtes HTTP

mongoose.connect(process.env.DB_MONGODBCONNECT,
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
    res.setHeader('access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.json()); // on parse les données reçue pour pouvoir les éxploités. 


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;