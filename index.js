const express = require('express')
require('dotenv').config()
require('./db/connection')

const app = express()

app.listen(process.env.PORT, ()=> {
    console.log(`server is up on port ${process.env.PORT}`)
})