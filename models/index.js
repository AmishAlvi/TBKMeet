const user = require("./User");
const topic = require("./topic");
const meeting = require("./meeting");
const meetingFile = require("./meetingFiles");
module.exports = {
  ...user,
  ...topic,
  ...meeting,
  ...meetingFile
};
