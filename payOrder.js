const router = require('express').Router();
const payOrder = require('../models/payOrder');

router.post('/addPaidOrder', (req, res) => {
    const { orderID, totalPrice, orderItems, status, address, city, postalCode, phoneNumber,email } = req.body;
    const newOrder = new payOrder({ orderID, totalPrice, orderItems, status, address, city, postalCode, phoneNumber,email });
    newOrder.save()
        .then(() => res.json('Order Paid and Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updatePaidOrder").put(async (req, res) => {
    const { orderID, totalPrice, orderItems, status, address, city, postalCode, phoneNumber,email } = req.body;
    const order = {
        orderID, totalPrice, orderItems, status, address, city, postalCode, phoneNumber,email
    }
    const update = await payOrder.findOneAndUpdate({ orderID: orderID }, order).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.delete('/deletePaidOrder/:orderID', async (req, res) => {
    const { orderID } = req.params;
    try {
        await payOrder.findOneAndDelete({ orderID });
        res.status(200).json({ status: 'Order Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error with Deleting Data', error: err.message });
    }
});

router.get('/allPaidOrders', async (req, res) => {
    try {
        const orders = await payOrder.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error', error: err.message });
    }
});

module.exports = router;
