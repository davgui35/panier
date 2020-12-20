//1 page d'accueil, 1 page produit, 1 page panier, 1 page admin
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'pug');

//Parser le body (traitement de l'objet en chaîne )
app.use(bodyParser.urlencoded({extended: false}));

//Routes shop
const shopRoutes = require('./routes/shop');
const shop = require('./controllers/shop');
app.use('/', shopRoutes);

//Routes admin
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

//Port de l'application
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));
