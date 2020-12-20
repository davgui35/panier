const express = require('express');
const router = express.Router();

//Pour acceder au dossier controller/shop.js
const shopController = require('../controllers/shop');

//lorsque l'on a une requête de type GET à la racine on récupère getIndex du controller 
router.get('/', shopController.getIndex);

//Route selon id du produit
router.get('/produit/:id', shopController.getProductDetails);

//Route vers le panier
router.get('/panier',shopController.getCart);

//Route en cliquant sur le bouton ajouter au panier
router.post('/ajouter-au-panier', shopController.postCart);

module.exports = router;