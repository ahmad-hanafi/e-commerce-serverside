function errorHandler(err, req, res, next) {
    // console.log(err,"ini handler")
    // console.log(err.code, "ini code handler")
    if (err.name === 'SequelizeUniqueConstraintError') {
        console.log(err, "ini error dalam if")
        res.status(400).json({
            message: err.message,
            detail: err.errors[0].message
        })
    } else if (err.code === 400) {
        // console.log(err,"masuk ke code 400")
        // console.log(err.message.errors[0].message,"ini di if awal")
        if (err.message.errors) {
            res.status(400).json({
                message: err.message.errors[0].message,
                // detail: err.errors[0].message
            })  
            // console.log(message,"masuk sini")
        } else {
            // console.log("masuk sini errornya")
            res.status(400).json({ message: err.message})
            // console.log(err,"harusnya gak masuk sini")
            
        }
    } else if (err.code === 401 || err.name == "JsonWebTokenError") {
        res.status(401).json({message: err.message})
    } else if (err.code === 404) {
        res.status(404).json({message: err.message})
    } else {
        // console.log("masuk ke 500")
        res.status(500).json({message : err})
    }
    // console.log("kalau gak masuk kondisi")
}

module.exports = errorHandler