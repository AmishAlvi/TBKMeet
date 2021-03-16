const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getEmails,startMeeting} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/meetingSave",[meeting]);
router.get("/getMeetings",[getMeeting]);
router.get("/getEmails",[getEmails]);
router.get('/startMeeting/:id',[startMeeting]);

module.exports = router;