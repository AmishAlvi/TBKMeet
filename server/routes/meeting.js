const {Router} = require("express");
const http = require("http");
const {meeting,getMeeting,getOneMeeting,getEmails,startMeeting,modifyMeeting} = require("../controllers/meeting");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

<<<<<<< Updated upstream
router.post("/meetingSave",[requireAuthentication,meeting]);
router.get("/getMeetings/:id",[getOneMeeting]);
router.get("/getMeetings",[getMeeting]);
router.get("/getEmails",[getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);
router.post('/modifyMeeting/:id',[modifyMeeting]);
=======
router.post("/meetingSave",[meeting]);
router.get("/getMeetings",[getMeeting]);
router.get("/getMeetings/:id",[getOneMeeting]);
router.get("/getEmails",[getEmails]);
router.get('/startMeeting/:id',[requireAuthentication,startMeeting]);
router.get('/modifyMeeting/:id',[modifyMeeting]);
>>>>>>> Stashed changes

module.exports = router;