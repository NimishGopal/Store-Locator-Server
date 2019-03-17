const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
const {getConnection, getCollectionValues} = require('./database/models/getConnection');
const PORT = 5000;
 
app.get('/', (req, res) => {
    getConnection(MongoClient, url)
    .then(function (db) {
        getCollectionValues(db, "Category")
        .then(function(resValues){
            res.send(resValues);
        });
    });
});

app.listen(PORT);