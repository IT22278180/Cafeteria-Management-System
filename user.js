const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();


router.route("/profile/:email").get(async (req, res) => {
    const username = req.params.email;
    userSchema.find({ email: username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/delete/:email").delete(async (req, res) => {
    const username = req.params.email;
    userSchema.findOneAndDelete({ email: username })
        .then(() => {
            res.status(200).send({ status: "User Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});



router.route('/register').post(async (req, res, next) => {    
    try {
        const existingUser = await userSchema.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                message: 'Email is Already Used'
            })
        }
        let user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            isLoyal: req.body.isLoyal,
            points: req.body.points,
            userType: "Customer",
        })
        await user.save();
        res.json({
            message: 'Sign Up Successfully'
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/update").put(async (req, res) => {
    const { name, email, password, phone, isLoyal, points, userType } = req.body;
    userSchema.findOneAndUpdate({ email: email }, { name, email, password, phone, isLoyal, points, userType })
        .then(() => {
            res.status(200).send({ status: "Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating Data", error: err.message });
        });
});



router.post('/login', async (req, res) => {

    const { email, password } = req.body;    

    try {
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: false });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: false });
        }

        return res.status(200).json({ message: true });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});

router.route('/getAll').get(async (req, res, next) => {
    try {
        const user = await userSchema.find();
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
