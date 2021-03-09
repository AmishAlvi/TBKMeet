const user = require("./User");
const topic = require("./topic");
const meeting = require("./meeting");
module.exports = {
  ...user,
  ...topic,
  ...meeting
};
