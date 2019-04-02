module.exports = {
  getConnection: getConnection = (Client, url) => {
    return new Promise(function (resolve, reject) {
      Client.connect(url, { useNewUrlParser: true }, function (err, database) {
        if (err) reject(err);
        console.log("Connection to DB Successful");
        resolve(database.db("StoreLocator"));
      });
    });
  }
}


