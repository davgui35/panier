//Extension npm fileSystem (read, write)
const fs = require('fs');
//Pour les chemins
const path = require('path');
//Générer un timestamp d'un id unique
const {v1: uuidv1} = require('uuid');

//Récupération de la racine
const appDir = path.dirname(require.main.filename);

//Chemin complet pour aller jusqu'au fichier json
const p = path.join(appDir, 'data', 'products.json');

//Fonction pour ne pas utiliser plusieurs fois fs.readFile
const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

class Product {

    constructor(name, description, image, price){
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    //Enregistrer le produit dans le fichier json
    save(callback){
        this.id = uuidv1();

        getProductsFromFile(products => {
            //this= nouveau produit
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                if(err) console.log(err);
                callback();
            });
        });
    }

    //Methode pour trouver tous les produits (static permet d'éviter d'instancier la classe pas de new Product)
    static findAll(callback){
        getProductsFromFile(products => {
            callback(products);
        });
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);
        });
    }
}

module.exports = Product;