module.exports = {
    login: login = (database, body) => {
      return new Promise(function (resolve, reject) {
        database.collection("Users").findOne({email: body.email}, (err, result) => {
            if(err) reject(err)
            if(result === null) {
                resolve({});
            }
            else{
                if(result.password === body.password){
                    resolve(result);
                }
                else{
                  resolve({"message": "Incorrect Password"})
                }
            }
        })
      });
    }
  }