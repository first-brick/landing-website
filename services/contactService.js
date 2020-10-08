const dbServices = require("./db_services");
const uuid = require("uuid");

module.exports.getMessage = function (user, logger) {
  console.log("recieved a new message: ")
  console.log(JSON.stringify(user))
}
