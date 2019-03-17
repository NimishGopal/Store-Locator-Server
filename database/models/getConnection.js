module.exports = {
  getConnection: getConnection = (Client, url) => {
    return new Promise(function (resolve, reject) {
      Client.connect(url, { useNewUrlParser: true }, function (err, database) {
        if (err) reject(err);
        console.log("Connection to DB Successful");
        resolve(database.db("StoreLocator"));
      });
    });
  },
  getCollectionValues: getCollectionValues = (database, name) => {
    return new Promise(function (resolve, reject) {
      database.collection(name).find({}).toArray(function (err, result) {
        if (err) console.log(err);
        resolve(result);
      });
    });
  }
}


