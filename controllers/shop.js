const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getIndex = (req, res) => {
    Product.findAll(products =>{
        // console.log(products);
        res.render('index', {
            title: 'Accueil',
            path: '/',
            products: products
        });
    })
}

const getProductDetails = (req, res) => {
    // console.log(req.params.id);
    Product.findById(req.params.id, product =>{
        //console.log(product);
        res.render('product-details', {
            title: product.name,
            product: product
        })
    });
}

const getCart = (req, res) => {
    Cart.getCart(cart => {
       if(cart.products.length > 0) {
        Product.findAll(products => {
            //console.log(products);
    
            let cartProducts = [];
            products.forEach(product => {
                const productData = cart.products.find(prod => prod.id === product.id);
    
                //Si des produits correspondent (pas undefined)
                if(productData){
                    cartProducts.push({product: product, qty:productData.qty});
                }
            });
    
            //console.log(cartProducts);
    
            res.render('cart', {
                title: 'Panier',
                path: '/panier',
                cartProducts: cartProducts,
                totalPrice: cart.totalPrice,
                hasProducts: true
            });
        });
    }else{
           res.render('cart', {
               title: 'Panier',
               path: '/panier',
               hasProducts: false
           });
       }
    });
}

//Ajouter au panier envoie le post
const postCart = (req, res) => {
    // console.log(req.body.productId);
    Product.findById(req.body.productId, product =>{
        Cart.add(req.body.productId, product.price, () =>{
            res.redirect('/panier');
        })
    });
}

module.exports = {
    getIndex: getIndex,
    getProductDetails: getProductDetails,
    getCart: getCart,
    postCart: postCart
}