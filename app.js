if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const router = require('./routes/index')
const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

module.exports = app