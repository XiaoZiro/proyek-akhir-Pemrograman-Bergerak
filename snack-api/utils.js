import mysql from "mysql";
const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "veggierecipe",
  }

const connection = mysql.createConnection(config)
var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};
export const querySQL = (sqlString, args = []) => {
    return new Promise((resolve, reject) => {
      connection.query(sqlString, args, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(result);
      });
    });
  };