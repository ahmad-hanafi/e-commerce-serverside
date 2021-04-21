const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const {authenticate, adminAuthorize, customerAuthorize} = require('../middlewares/auth.js')

router.post('/register', userController.register) 
router.post('/login', userController.login)


router.get('/products', productController.showAll) 
router.get('/products/:id', productController.findbyId)
// router.get('/products/:category', productController.findCategory) 

router.use(authenticate)

router.post('/products', adminAuthorize, productController.addProduct) 
router.put('/products/:id', adminAuthorize, productController.update) 
router.patch('/products/:id', adminAuthorize, productController.updateOne) 
router.delete('/products/:id', adminAuthorize, productController.delete) 

router.get('/carts', customerAuthorize, cartController.showAll) 
router.patch('/carts', customerAuthorize, cartController.patchCart) 
router.patch('/carts/plus', customerAuthorize, cartController.incrementCart) 
router.patch('/carts/min', customerAuthorize, cartController.decrementCart) 
router.delete('/carts/:id', customerAuthorize, cartController.deleteCart) 
router.patch('/carts/:id', customerAuthorize, cartController.checkoutCart) 


module.exports = router