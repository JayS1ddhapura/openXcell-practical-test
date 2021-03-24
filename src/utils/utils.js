const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.hashPassword = async (password, salt) => {
    try {
        return await bcrypt.hash(password, salt)
    }
    catch (e) {
        console.log(e)
    }
}

exports.generateToken = (id, username, expiresIn) => {
    try {
        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: expiresIn || process.env.JWT_EXIPIRATION_TIME })
        console.log(token)
        return token
    } catch (e) {
        console.log(e)
    }
}

exports.matchPassword = async (password, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, userPassword)
        return isMatch
    } catch (e) {
        console.log(e)
    }
}