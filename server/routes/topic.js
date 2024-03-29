const {Router} = require("express");
const http = require("http");
const {topic,getTopic,getOneTopic,modifyTopic,deleteTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();


router.post("/topicSave", [requireAuthentication,topic]);
router.get("/getTopic", [requireAuthentication,getTopic]);
router.get("/getTopic/:id", [requireAuthentication,getOneTopic]);
router.post("/modifyTopic/:id", [requireAuthentication,modifyTopic]);
router.get("/deleteTopic/:id", [requireAuthentication,deleteTopic]);



module.exports = router;