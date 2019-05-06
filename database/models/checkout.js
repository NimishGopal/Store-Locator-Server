module.exports = {
    checkout: checkout = (database, body) => {
      return new Promise(function (resolve, reject) {
        database.collection("Orders").insertOne(body, (err, order) => {
            resolve(order.ops[0])
        })
      });
    }
  }