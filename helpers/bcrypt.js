const bcrypt = require('bcrypt')

function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plainPassword, salt)

    return hash
}

module.exports = { hashPassword }