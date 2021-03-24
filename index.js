const express = require('express')
const router = require('./src/routes/user-routes')
require('dotenv').config()
require('./db/connection').sync({ alter: true })

// routers import
const userRouter = require('./src/routes/user-routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routers
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is up on port ${process.env.PORT}`)
})