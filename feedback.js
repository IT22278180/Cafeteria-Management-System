const router = require('express').Router();
let feedbackSchema = require('../models/feedback');

router.route('/add').post((req, res) => {
    const { email, description, rating} = req.body;
    const feedback = new feedbackSchema({ email, description, rating });
    feedback.save()
        .then(() => res.json('Feeback Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/all").get(async (req, res) => {
    feedbackSchema.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;