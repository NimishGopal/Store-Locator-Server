const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
var url = "mongodb://127.0.0.1:27017";
const { getConnection } = require('./database/models/getConnection');
const { getCategoryValues } = require('./database/models/getCategory');
const { getStores } = require('./database/models/getStores');
const PORT = 5000;

app.use(cors({
    "origin": "*",
}));
app.get('/', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            console.log(db)
            getCategoryValues(db, "Category")
                .then(function (resValues) {
                    res.send(resValues);
                });
        });
});
app.get('/:category', (req, res) => {
    getConnection(MongoClient, url)
        .then(function (db) {
            getStores(db, "Stores", req.params.category)
                .then(function (resValues) {
                    res.send(resValues);
                });
        });
});

app.listen(PORT);