module.exports = {
    register: register = (database, body) => {
      return new Promise(function (resolve, reject) {
        database.collection("Users").findOne({email: body.email}, (err, result) => {
            if(err) reject(err)
            if(result === null) {
                database.collection("Users").insertOne(body, (user) => {
                    resolve(user)
                });
            }
            else{
                resolve({});
            }
        })
      });
    }
  }