const sequelize = require('../../db/connection')
const { DataTypes } = require('sequelize')
const User = require('./user-model')
const Topic = require('./topic-model')

const Post = sequelize.define('Post', {
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'posts'
})

User.hasMany(Post)
Post.belongsTo(User)

Topic.hasMany(Post)
Post.belongsTo(Topic)

module.exports = Post