const {Router} = require("express");
const http = require("http");
const {topic,getTopic,getOneTopic,modifyTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/topicSave", [topic]);
router.get("/getTopic", [getTopic]);
router.get("/getTopic/:id",[getOneTopic]);
router.post("/modifyTopic/:id",[modifyTopic]);


module.exports = router;