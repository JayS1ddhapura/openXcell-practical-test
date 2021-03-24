const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const utils = require('../utils/utils')
require('dotenv').config()
const { Op } = require('sequelize')

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, DOB, gender } = req.body

        // checking if necessary details are available
        if (!username || !email || !password) {
            return res.status(400).send({ status: false, message: 'Please provide necessary details.' })
        }

        // checking for unique email 
        if (await User.findOne({ where: { email } })) {
            return res.status(400).send({ status: false, message: 'User with this email already exists.' })
        }

        // checking for unique username
        if (await User.findOne({ where: { username } })) {
            return res.status(400).send({ status: false, message: 'User with this username already exists.' })
        }

        // email validation 
        if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            return res.status(400).send({ status: false, message: 'Please enter valid email.' })
        }

        const hashedPassword = await utils.hashPassword(password, parseInt(process.env.SALT))
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            DOB,
            gender
        })
        const token = utils.generateToken(user.id, user.username)
        res.status(201).send({ status: true, message: 'User successfully registered.', access_token: token })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body

        // checking if necessary details are available
        if (!usernameOrEmail || !password) {
            return res.status(400).send({ status: false, message: 'Please provide necessary details.' })
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.usernameOrEmail },
                    { email: req.body.usernameOrEmail }
                ]
            }
        })
        if (!user) {
            return res.status(404).send({ status: false, message: 'User with this email or username doen not exist.' })
        }

        // comparing password
        const isMatch = await utils.matchPassword(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).send({ status: false, message: 'Incorrect password.' })
        }
        var userDisplay = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            gender: user.gender,
        }
        const token = utils.generateToken(user.id, user.username)
        res.status(200).send({ status: true, message: 'Successfully logged in.', user: userDisplay, access_token: token })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}