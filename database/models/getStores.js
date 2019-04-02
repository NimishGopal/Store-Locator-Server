module.exports = {
    getStores: getStores = (database, name,  categoryFromClient) => {
      return new Promise(function (resolve, reject) {
        database.collection(name).findOne({"category": categoryFromClient}, function (err, result) {
          if (err) console.log(err);
        //   database.close()
        console.log(result)
          resolve(result);
        });
      });
    }
  }
  
  
  