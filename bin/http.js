const app = require('../app')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Sever is listening to port ${port}`)
})
