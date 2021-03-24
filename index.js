const express = require('express')
const router = require('./src/routes/user-routes')
require('dotenv').config()
require('./db/connection').sync()

// routers import
const userRouter = require('./src/routes/user-routes')
const topicRouter = require('./src/routes/topic-routes')
const postRouter = require('./src/routes/post-routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routers
app.use('/users', userRouter)
app.use('/topics', topicRouter)
app.use('/posts', postRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is up on port ${process.env.PORT}`)
})