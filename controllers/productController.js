const {Product} = require('../models')

class productController {
    static showAll(req,res,next) { // get all product
        // console.log('masuk show all')
        Product.findAll()
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next({
                code: 500,
                message: "Internal server error"
            })
        })
    }

    // static findCategory(req,res,next) {
    //     Product.findAll({
    //         where: {category: req.params.category}
    //     })
    //     .then((product) => {
    //         res.status(200).json(product)
    //     })
    //     .catch(err => {
    //         next({
    //             code: 500,
    //             message: "Internal server error"
    //         })
    //     })
    // }

    static addProduct(req,res,next) {
        const newProduct = {
            name : req.body.name,
            image_url: req.body.image_url,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
        }
        Product.create(newProduct)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
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

    static findbyId(req, res,next) { //get product by id
        console.log(req.params)
        Product.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(product => {
            console.log(product, "masuk find id")
            res.status(200).json(product)
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not found"
            })
        })
    }

    static update(req,res,next) {
        Product.update(req.body, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: "Succeess Update"})
        })
        .catch(err => {
            next(err)
        })
    }

    static updateOne(req,res,next) {
        let dataUpdate
        
        Product.findOne({ where: {id: req.params.id}})
        .then(data => {
            dataUpdate = data.stock+Number(req.body.stock)
            console.log(dataUpdate)
            
            return Product.update({stock: dataUpdate}, {
                where: {
                    id : +req.params.id
                },
                returning: true
            })
        })
        .then(product => {
            res.status(200).json(product)
            
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not found"
            })
        })
    }

    static delete(req,res,next) {
        Product.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(product => {
            res.status(200).json({ message: "Product success to delete"})
        })
        .catch(err => {
            next({
                code: 404,
                message: "Data not found"
            })
        })
    }
    
}

module.exports = productController