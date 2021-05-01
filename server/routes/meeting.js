const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getOneMeeting,getEmails,startMeeting,modifyMeeting,endMeeting,getEndedMeetings} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/meetingSave",[meeting]);
router.get("/getMeetings",[getMeeting]);
router.get("/getMeetings/:id",[getOneMeeting]);
router.get("/getEmails",[getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);
router.post('/modifyMeeting/:id',[modifyMeeting]);

router.post('/endMeeting/:id',[requireAuthentication,endMeeting]);
router.get('/getEndedMeetings',[getEndedMeetings]);

module.exports = router;