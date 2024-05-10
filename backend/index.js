const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')

PORT = process.env.PORT || 3000
DB_URL = process.env.DB_URL

//Database Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Successfully Connected')
        app.listen(PORT, () => {
            console.log(`Server Running at: http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
        console.log('Database connection error')
    })

