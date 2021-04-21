const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles
        }
        User.create(newUser)
            .then(user => {
                res.status(201).json({ email: user.email, id: user.id, roles: user.roles })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        if (req.body.email === '') {
            console.log(req.body.email, 'kalau email kosong')
            next({
                code: 400,
                message: "Email cannot be empty"
            })
        } else if (req.body.password === '') {
            next({
                code: 400,
                message: "Password cannot be empty"
            })
        } else {
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user) {
                        const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
                        if (isValidPassword) {
                            let payload = { id: user.id, email: user.email, roles: user.roles }
                            res.status(201).json({ access_token: generateToken(payload) })

                        } else {
                            next({
                                code: 400,
                                message: "invalid email or password"
                            })
                        }
                    } else {
                        next({
                            code: 400,
                            message: "invalid email or password"
                        })
                    }
                })
                .catch(err => {
                    next({
                        code: 500,
                        msg: err
                    })
                })
        }
    }
}

module.exports = UserController