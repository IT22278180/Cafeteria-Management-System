const router = require('express').Router();
let menuItem_Schema = require('../models/menuItem');

router.route('/addMenuItem').post((req, res) => {
    const { itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status } = req.body;
    const menuItem = new menuItem_Schema({ itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status });
    menuItem.save()
        .then(() => res.json('Item Add!'))//can use '201 Created' code to indicate success
        .catch(err => res.status(400).json('Error: ' + err));
});

//handleUpdateMenuItem

//defines a route handler for HTTP PUT requests to the /update endpoint
router.route("/update").put(async (req, res) => { 

    //extracts the necessary data from the request body
    const { itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status } = req.body;
    
    //creates an object named menuItem containing the extracted data from the request body
    const menuItem = {
        itemId, itemName, inventoryItem, description, calorieCount, price, categoryType, quantity, picture, status
    }

    //searches for a menu item in the database with the specified itemId and updates it with the data from the menuItem object
    const update = await menuItem_Schema.findOneAndUpdate({ itemId: itemId }, menuItem).then(() => {
        res.status(200).send({ status: "Item Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

//handleDeleteMenu
router.route("/delete/:itemId").delete(async (req, res) => {
    let itemId = req.params.itemId;
    menuItem_Schema.findOneAndDelete({ itemId: itemId })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const searchResults = await MenuItem.find({ name: { $regex: query, $options: 'i' } });
        res.json(searchResults);
    } catch (error) {
        console.error('Error searching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//fetchMenuDetails
router.route("/allMenuItem").get(async (req, res) => {
    menuItem_Schema.find()
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;
/*
201 Created - new resource has been successfully created
202 Accepted - request has been accepted for processing, but the processing has not been completed yet
204 No Content - request was successful, but the server is not returning any content in the response body
*/

/*
400 Bad Request - server cannot process the request due to malformed syntax or other client-side errors in the request
401 Unauthorized - request requires authentication, but the client has not provided valid credentials or has not provided any credentials
403 Forbidden - server understood the request, but refuses to authorize it. It often occurs when the client doesn't have permission to access the requested resource
404 Not Found - server cannot find the requested resource
405 Method Not Allowed - he method specified in the request (e.g., GET, POST, PUT, DELETE) is not allowed for the resource identified by the request URI
408 Request Timeout - server timed out waiting for the request from the client
*/