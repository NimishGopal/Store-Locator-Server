module.exports = {
    getCategoryValues: getCategoryValues = (database, name) => {
      return new Promise(function (resolve, reject) {
        database.collection(name).find({}).toArray(function (err, result) {
          if (err) console.log(err);
          console.log(database)
        //   database.close()
          resolve(result);
        });
      });
    }
  }
  
  
  