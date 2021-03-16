const login = require("./login");
const logout = require("./logout");
const signUp = require("./signup");
const emailverification = require("./emailverification");
const resendemailverification = require("./resendemailverification");
const passwordreset = require("./passwordreset");
const validPasswordToken = require("./validPasswordToken");
const newPassword = require("./newPassword");

module.exports = {
  login,
  logout,
  signUp,
  emailverification,
  resendemailverification,
  passwordreset,
  validPasswordToken,
  newPassword
};
