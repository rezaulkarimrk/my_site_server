require('dotenv').config();
require('./config/database');

const express = require('express');
const cors = require('cors');
const adminRouter = require('./routes/admin.route');
const messageRouter = require('./routes/message.route')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(adminRouter);
app.use(messageRouter);


// app home route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        status: 200,
        message: "Server is Rouning"
      });
});

//resource not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "404 route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        status: 500,
        message: "404 route not found"
    });
});

  
module.exports = app;