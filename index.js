const express = require('express');
const app = express();
const util = require('util')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const url = "mongodb://127.0.0.1:27017";
const { getConnection } = require('./database/models/getConnection');
const { getCategoryValues } = require('./database/models/getCategory');
const { getStores } = require('./database/models/getStores');
const { getProducts } = require('./database/models/getProducts');
const { register } = require('./database/models/registerUser');
const { login } = require('./database/models/loginUser');
const { checkout } = require('./database/models/checkout');
const PORT = 5000;

app.use(cors({
    "origin": "*",
}));
app.get('/', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            getCategoryValues(db, "Category")
                .then(function (resValues) {
                    res.send(resValues);
                });
        });
});
app.get('/:category', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            getStores(db, "Store", req.params.category)
                .then(function (resValues) {
                    res.send(JSON.stringify(resValues));
                });
        });
});
app.get('/:category/:storeID', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            getProducts(db, "Products", req.params.storeID)
                .then(function (resValues) {
                    res.send(JSON.stringify(resValues));
                });
        });
});

const keyPublishable = 'pk_test_Cz9Nqpyb8VKWGosSt3zg44ED00qheaM6iM'
const keySecret = 'sk_test_M7XUeJ9bi7eU4Weq0RcQecxL006P2rHDcy'
const stripe = require('stripe')(keySecret)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/register', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            register(db, req.body)
                .then((result) => {
                    res.send(result)
                })
        })
});

app.post('/login', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            login(db, req.body)
                .then((result) => {
                    res.send(result)
                })
        })
});
app.post('/checkout', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            checkout(db, req.body)
                .then((result) => {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'gsnimish@gmail.com',
                            pass: 'Nimi1525'
                        }
                    });

                    var mailOptions = {
                        from: 'gsnimish@gmail.com',
                        to: req.body.email,
                        subject: 'Order Successful',
                        text: `Hey! your order was successful!\n Your Order ID is ${result._id}\n Kindly Order with us again!`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.send(result);
                })
        })
});

app.listen(PORT);