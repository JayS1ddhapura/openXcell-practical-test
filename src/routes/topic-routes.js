const express = require('express')
const userAuth = require('../middleware/user-authentication')
const controller = require('../controllers/topic-controller')

const router = new express.Router()

router.post('/', userAuth, controller.createTopic)

module.exports = router