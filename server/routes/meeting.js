const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getOneMeeting,getEmails,startMeeting,modifyMeeting,endMeeting,getEndedMeetings,deleteMeeting} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.get("/deleteMeeting/:id",[requireAuthentication,deleteMeeting])
router.post("/meetingSave",[requireAuthentication,meeting]);
router.get("/getMeetings/:id",[requireAuthentication,getOneMeeting]);
router.get("/getMeetings",[requireAuthentication,getMeeting]);
router.get("/getEmails",[requireAuthentication,getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);
router.post('/modifyMeeting/:id',[requireAuthentication,modifyMeeting]);
router.post('/endMeeting/:id',[endMeeting]);
router.get('/getEndedMeetings',[requireAuthentication,getEndedMeetings]);

module.exports = router;