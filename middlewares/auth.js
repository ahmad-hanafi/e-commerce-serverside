const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authenticate = (req, res, next) => {
    let decoded = verifyToken(req.headers.access_token)
    User.findOne({
        where: { id: decoded.id, email: decoded.email }
    })
        .then(user => {
            req.currentUser = { id: user.id, email: user.email, roles: user.roles }
            next()
        })
        .catch(err => {
            next({
                code: 401,
                message: "Unathorize"
            })
        })
}

const adminAuthorize=(req,res,next)=>{
    // console.log(req.currentUser.roles)
    if(req.currentUser.roles !== 'admin'){
        next({
            code:401,
            message: "Admin only",
          });
    }
    else{
        next()
    }
}

const customerAuthorize=(req,res,next)=>{
    // console.log(req.currentUser.roles)
    if(req.currentUser.roles === 'Customer'){
        // console.log('masuk cus auth')
        // console.log(req.currentUser)
        next()
    }
    else{
        next({
            code:401,
            message: "You must login first",
          });
    }
}

module.exports = {
    authenticate,
    adminAuthorize,
    customerAuthorize
}