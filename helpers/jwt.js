const jwt = require('jsonwebtoken')

const generateToken = (payload) => jwt.sign(payload, process.env.SECRET)
const verifyToken = (token) => jwt.verify(token, process.env.SECRET)

module.exports = {
    generateToken,
    verifyToken
}