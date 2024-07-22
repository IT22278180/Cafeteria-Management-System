const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection successfully");
});

const menuItem = require('./routes/menuItem.js');
app.use('/menuItem', menuItem);

const user = require('./routes/user.js');
app.use('/user', user);

const payOrder = require('./routes/payOrder.js');
app.use('/payOrder', payOrder);

const codOrder = require('./routes/codOrder.js');
app.use('/codOrder', codOrder);

const inventoryItem = require('./routes/inventoryItem.js');
app.use('/inventoryItem', inventoryItem);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

    const admin = require('./routes/admin.js');
    app.use('/admin', admin);

    const salary = require('./routes/salary.js');
    app.use('/salary', salary);

    const promotion = require('./routes/promotion.js');  
    app.use('/promotion', promotion);

    const support = require('./routes/support.js');
app.use('/support', support);

const feedback = require('./routes/feedback.js');
app.use('/feedback', feedback);
});