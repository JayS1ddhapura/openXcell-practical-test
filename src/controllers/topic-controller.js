const Topic = require('../models/topic-model')

exports.createTopic = async (req, res) => {
    try {
        const existingTopic = await Topic.findOne({ where: { title: req.body.title } })
        if (existingTopic) {
            return res.status(400).send({ status: false, message: 'Topic with this title already exists.' })
        }

        const topic = await Topic.create({
            title: req.body.title,
            createdBy: req.user.id
        })
        res.status(201).send({ status: true, message: 'Topic successfully added.', topic })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}

exports.listTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll({ attributes: ['title'] })

        if (topics.length === 0) {
            return res.status(404).send({ status: false, message: 'No topics found at the moment' })
        }

        res.status(200).send({ status: true, message: 'List of topics:', topics })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}