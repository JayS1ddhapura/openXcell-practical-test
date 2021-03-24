const express = require('express')
const controller = require('../controllers/user-controller')
const userAuth = require('../middleware/user-authentication')

const router = new express.Router()

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.get('/profile', userAuth, controller.profile)

module.exports = router