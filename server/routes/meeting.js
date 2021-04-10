const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getEmails,startMeeting} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/meetingSave",[requireAuthentication,meeting]);
router.get("/getMeetings",[requireAuthentication,getMeeting]);
router.get("/getEmails",[requireAuthentication,getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);

module.exports = router;