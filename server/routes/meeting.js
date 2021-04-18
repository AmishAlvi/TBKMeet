const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getOneMeeting,getEmails,startMeeting,modifyMeeting} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/meetingSave",[requireAuthentication,meeting]);
router.get("/getMeetings/:id",[requireAuthentication,getOneMeeting]);
router.get("/getMeetings",[requireAuthentication,getMeeting]);
router.get("/getEmails",[requireAuthentication,getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);
router.get('/modifyMeeting/:id',[requireAuthentication,modifyMeeting]);

module.exports = router;