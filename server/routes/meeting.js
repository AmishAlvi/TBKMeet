const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getEmails} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/meetingSave",[requireAuthentication,meeting]);
router.get("/getMeetings",[getMeeting]);
router.get("/getEmails",[getEmails]);


module.exports = router;