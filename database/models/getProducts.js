module.exports = {
    getProducts: getProducts = (database, name,  id) => {
      return new Promise(function (resolve, reject) {
        database.collection(name).find({"storeID": id}, function (err, result) {
          if (err) console.log(err);
          resolve(result.toArray());
        });
      });
    }
  }
  
  
  