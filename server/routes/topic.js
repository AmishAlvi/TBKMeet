const {Router} = require("express");
const http = require("http");
const {topic,getTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/topicSave", [requireAuthentication,topic]);
router.get("/getTopic", [requireAuthentication,getTopic]);


module.exports = router;