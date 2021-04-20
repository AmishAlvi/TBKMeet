const {Router} = require("express");
const http = require("http");
const {topic,getTopic,getOneTopic,modifyTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

<<<<<<< Updated upstream
router.post("/topicSave", [requireAuthentication,topic]);
router.get("/getTopic/:id",[getOneTopic]);
router.get("/getTopic", [getTopic]);
router.post("/modifyTopic/:id",[modifyTopic]);
=======
router.post("/topicSave", [topic]);
router.get("/getTopic", [getTopic]);
router.get("/getTopic/:id",[getOneTopic]);
router.get("/modifyTopic/:id",[modifyTopic]);
>>>>>>> Stashed changes


module.exports = router;