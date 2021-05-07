const {Router} = require("express");
const http = require("http");
const {topic,getTopic,getOneTopic,modifyTopic,deleteTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/topicSave", [topic]);
router.get("/getTopic", [getTopic]);
router.get("/getTopic/:id",[getOneTopic]);
router.post("/modifyTopic/:id",[modifyTopic]);
router.get("/deleteTopic/:id",[deleteTopic]);


module.exports = router;