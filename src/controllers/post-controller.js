const Post = require('../models/post-model')
const User = require('../models/user-model')
const Topic = require('../models/topic-model')

exports.createPost = async (req, res) => {
    try {

        const { postTitle, content, TopicTitle } = req.body
        if (!postTitle || !content || !TopicTitle) {
            return res.status(400).send({ status: false, message: 'Please provide necessary details.' })
        }

        if (!await Topic.findOne({ where: { title: TopicTitle } })) {
            return res.status(404).send({ status: false, message: 'Topic not found.' })
        }

        const post = await Post.create({ ...req.body })
        res.status(201).send({ status: true, message: 'Post successfully created.', post })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}