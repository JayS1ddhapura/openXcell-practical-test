const sequelize = require('../../db/connection')
const { DataTypes } = require('sequelize')
const User = require('./user-model')

const Topic = sequelize.define('Topic', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    tableName: 'topics'
})

module.exports = Topic