const { Cart, Product } = require('../models')

class cartController {
    static showAll(req, res, next) {
        Cart.findAll({
            where: { UserId: req.currentUser.id },
            include: [{ model: Product }],
            order: [['createdAt', 'DESC']]
        })
        .then((cart) => {
            res.status(200).json(cart)
        })
        .catch((err) => {
            next({
                code: 500,
                message: "Internal server error"
            })
        })
    }

    static patchCart(req,res,next) {
        let cart
        let stock
        const { ProductId } = req.body
        const UserId = req.currentUser.id
        
        Cart.findOne({where: {ProductId, UserId}, include:[ {model:Product}]})
        .then(data => {
            if(data !== null) {
                stock = data.Product.dataValues.stock
                if (data.dataValues.quantity < stock) {
                    cart = data.dataValues.quantity+1
                    return Cart.update({quantity: cart}, { where: {
                        ProductId
                    },
                    returning: true,
                })  
                } else {
                    next({message: 'Out of Stock'})
                    return '' 
                }
            } else {
                const addCart = {
                    UserId: req.currentUser.id,
                    ProductId,
                    quantity: 1,
                }
                return Cart.create(addCart)
            }
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            console.log(err)
            if (err.message) {
                next({
                    code: 400,
                    message: err
                })
            } else {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            }
        })
    }

    static incrementCart(req,res,next) {
        let cart
        let stock
        const id = req.body.id

        Cart.findOne({where: {id: id}, include:[ {model:Product}]})
        .then(data => {
            stock = data.Product.dataValues.stock
            if(data !== null) {
                if (data.dataValues.quantity < stock) {
                    cart = data.dataValues.quantity+1
                    return Cart.update({quantity: cart}, { where: {
                        id: id
                    },
                    returning: true
                })  
                } else {
                    next({message: 'Out of Stock'})
                    return '' 
                }
            } else {
                res.status(404).json('Not found')
            }
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            console.log(err)
            if (err.message) {
                next({
                    code: 400,
                    message: err
                })
            } else {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            }
        })
    }

    static decrementCart(req,res,next) {
        let cart
        let stock
        const id = req.body.id
        Cart.findOne({where: {id: id}, include:[ {model:Product}]})
        .then(data => {
            stock = data.Product.dataValues.stock
            if(data !== null) {
                if (data.dataValues.quantity < stock) {
                    if (data.dataValues.quantity > 1) {
                        cart = data.dataValues.quantity-1
                        return Cart.update({quantity: cart}, { where: {
                            id: id
                        },
                        returning: true
                    })  
                    } else {
                        Cart.destroy({
                            where: {
                                id: id
                            }
                        })   
                    }
                } else {
                    next({message: 'Out of Stock'})
                    return '' 
                }
            } else {
                res.status(404).json('Not found')
            }
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            console.log(err)
            if (err.message) {
                next({
                    code: 400,
                    message: err
                })
            } else {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            }
        })
    }

    static deleteCart(req,res,next) {
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            res.status(200).json({ message: "Product has been delete from the list"})
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not found"
            })
        })
    }

    static checkoutCart(req,res,next) {
        let dataUpdate
        let cart
        let stock
        const id = req.params.id
        console.log(id)
        Cart.findOne({where: {id: id}, include:[ {model:Product}]})
        .then(data => {
            stock = data.Product.dataValues.stock
            cart = data.dataValues.quantity
            dataUpdate = stock-cart
            if(data !== null) {
                return Product.update({stock: dataUpdate}, {
                    where: {
                        id : data.Product.dataValues.id
                    },
                    returning: true
                })
            } else {
                res.status(404).json('Not found')
            }
        })
        .then(product => {
            return Cart.destroy({
                where: {
                    id: id
                }
            })
            .then(product => {
                res.status(200).json({ message: "Product has been delete from the list"})
            })
            .catch(err => {
                next({
                    code: 404,
                    message: "Data not found"
                })
            })
        })
        .catch(err => {
            console.log(err)
            if (err.message) {
                next({
                    code: 400,
                    message: err
                })
            } else {
                next({
                    code: 500,
                    message: "Internal server error"
                })
            }
        })
    }
}

module.exports = cartController