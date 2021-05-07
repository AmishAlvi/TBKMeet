const meeting = require("./meeting");
const getMeeting = require("./getMeeting");
const getEmails = require("./getEmails");
const startMeeting = require("./startMeeting");
const getOneMeeting = require("./getOneMeeting");
const modifyMeeting = require("./modifyMeeting");
const endMeeting = require("./endMeeting");
const getEndedMeetings = require("./getEndedMeetings")
const deleteMeeting = require("./deleteMeeting");

module.exports = {
  meeting,
  getMeeting,
  getEmails,
  startMeeting,
  getOneMeeting,
  modifyMeeting,
  endMeeting,
  getEndedMeetings,
  deleteMeeting
};