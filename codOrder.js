const router = require('express').Router();
const codOrder = require('../models/codOrder');

router.post('/addOrder', (req, res) => {
    const { orderID, totalPrice, orderItems, status, address, city,country, postalCode, phoneNumber,email } = req.body;
    const newOrder = new codOrder({ orderID, totalPrice, orderItems, status, address, city,country, postalCode, phoneNumber,email });
    newOrder.save()
        .then(() => res.json('Order Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/updateOrder").put(async (req, res) => {
    const { orderID, totalPrice, orderItems, status, address, city,country, postalCode, phoneNumber,email } = req.body;
    const order = {
        orderID, totalPrice, orderItems, status, address, city,country, postalCode, phoneNumber,email
    }
    const update = await codOrder.findOneAndUpdate({ orderID: orderID }, order).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.delete('/deleteOrder/:orderID', async (req, res) => {
    const { orderID } = req.params;
    try {
        await codOrder.findOneAndDelete({ orderID });
        res.status(200).json({ status: 'Order Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error with Deleting Data', error: err.message });
    }
});

router.get('/allOrders', async (req, res) => {
    try {
        const orders = await codOrder.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error', error: err.message });
    }
});

module.exports = router;
