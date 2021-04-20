const {Router} = require("express");
const http = require("http");
const {topic,getTopic,getOneTopic,modifyTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/topicSave", [requireAuthentication,topic]);
router.get("/getTopic/:id",[requireAuthentication,getOneTopic]);
router.get("/getTopic", [requireAuthentication,getTopic]);
router.post("/modifyTopic/:id",[requireAuthentication,modifyTopic]);


module.exports = router;