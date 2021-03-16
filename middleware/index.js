const validation = require("./validation");
const auth = require("./authentication-and-roles");

module.exports = {
  ...validation,
  ...auth
};
