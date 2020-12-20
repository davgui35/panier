const express = require('express');
const router = express.Router();

//Pour acceder au dossier controller/shop.js
const adminController = require('../controllers/admin');

//lorsque l'on a une requête de type GET pour l'admin on récupère getIndex du controller, on ne met pas /admin car il sera dans le app.js(sinon il sera 2 fois)
router.get('/', adminController.getIndex);
router.post('/ajouter-un-produit', adminController.postIndex);

module.exports = router;