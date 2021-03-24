const Topic = require('../models/topic-model')

exports.createTopic = async (req, res) => {
    try {
        const existingTopic = await Topic.findOne({ where: { topicTitle: req.body.topicTitle } })
        if (existingTopic) {
            return res.status(400).send({ status: false, message: 'Topic with this title already exists.' })
        }

        const topic = await Topic.create({
            topicTitle: req.body.topicTitle,
            createdBy: req.user.id
        })
        res.status(201).send({ status: true, message: 'Topic successfully added.', topic })
    } catch (e) {
        console.log(e)
        res.send({ status: false, message: e.message })
    }
}