const {Router} = require("express");
const http = require("http");
const {topic,getTopic} = require("../controllers/topic");
const {requireAuthentication,validateJson} = require("../middleware");

const router = Router();

router.post("/topicSave", [topic]);
router.get("/getTopic", [getTopic]);


module.exports = router;