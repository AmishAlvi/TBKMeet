const user = require("./user");
const company = require("./company");
const token = require("./token")

module.exports = {
  ...user,
  ...company,
  ...token
};
