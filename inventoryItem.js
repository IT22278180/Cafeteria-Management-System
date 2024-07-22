const router = require('express').Router();
let inventoryItem_Schema = require('../models/inventoryItem');

router.route('/addItem').post((req, res) => {
    const { itemId, itemName, stock, exp, mnf} = req.body;
    const inventoryItem = new inventoryItem_Schema({ itemId, itemName, stock, exp, mnf });
    inventoryItem.save()
        .then(() => res.json('Item Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/").put(async (req, res) => {
    const { itemId, itemName, stock, exp, mnf } = req.body;
    const inventory = {
        itemId, itemName, stock, exp, mnf
    }
    const update = await inventoryItem_Schema.findOneAndUpdate({ itemId: itemId }, inventory).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/delete/:itemId").delete(async (req, res) => {
    let itemId = req.params.itemId;
    inventoryItem_Schema.findOneAndDelete({ itemId: itemId })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allItem").get(async (req, res) => {
    inventoryItem_Schema.find()
        .then(inventoryItem => res.json(inventoryItem))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;