const express = require('express')
const userAuth = require('../middleware/user-authentication')
const controller = require('../controllers/post-controller')

const router = new express.Router()

router.post('/', userAuth, controller.createPost)

module.exports = router