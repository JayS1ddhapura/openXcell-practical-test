const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
require('dotenv').config()

const userAuth = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(401).send({ status: false, message: 'JWT token required.' })
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ where: { id: decoded.id, username: decoded.username } })

        if (!user) {
            return res.status(404).send({ status: false, message: 'Invalid token, User not found.' })
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}

module.exports = userAuth
