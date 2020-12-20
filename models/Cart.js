//Extension npm fileSystem (read, write)
const fs = require('fs');
//Pour les chemins
const path = require('path');


//Récupération de la racine
const appDir = path.dirname(require.main.filename);

//Chemin complet pour aller jusqu'au fichier json
const p = path.join(appDir, 'data', 'cart.json');

class Cart {
    //cart.json
    //{ products: [{id:123, qty: 1},{},{}], totalPrice: 0}

    static add(id, productPrice, callback) {

        //console.log(`Produit à ajouter au panier : `, id, productPrice);
        // let cart = { products: [], totalPrice: 0};
        // let product = {id: id, qty: 1};

        fs.readFile(p, (err, fileContent) => {
            let cart = { products : [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            //console.log(existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];

            if(existingProduct) {
                //Si le produit existe, on modifie sa quantité
                cart.products[existingProductIndex].qty = cart.products[existingProductIndex].qty+1; 
            }else{
                //S'il n'existe pas, on l'ajoute au panier
                cart.products.push({id: id, qty: 1});
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) console.log(err);
                callback();
            });
        });
        
    }

    //Récupérer le contenu de cart.json
    static getCart(callback) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products : [], totalPrice: 0};
            // Si pas d'erreur carte est le contenu du fichier
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            //Sinon tableau vide avec totalprice à 0
            callback(cart);
        })
    }
}

module.exports = Cart;