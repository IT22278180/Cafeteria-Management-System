const router = require('express').Router();
const Salary = require('../models/salary');

router.post('/add', (req, res) => {
    const { uid, name, date, days, salary, fullSalary } = req.body;
    const newSalary = new Salary({ uid, name, date, days, salary, fullSalary });

    newSalary.save()
        .then(() => res.json('Salary added successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all', (req, res) => {
    Salary.find()
        .then(salaries => res.json(salaries))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
