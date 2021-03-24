const sequelize = require('../../db/connection')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "Please enter a valid email address."
            }
        },
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATEONLY,
        defaultValue: null
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female', 'choose not to specify'],
        defaultValue: null
    }
}, {
    tableName: 'users'
});

module.exports = User