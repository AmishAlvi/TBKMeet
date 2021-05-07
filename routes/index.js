const {Router} = require("express");

const authRouter = require("./auth");
const profileRouter = require("./profile");
const topic = require("./topic");
const meeting = require("./meeting");
const router = Router();
const {fileUpload,getFiles} = require('../aws');

router.use("/auth/", authRouter);
router.use("/profile/", profileRouter);
router.post("/fileupload",[fileUpload]);
router.get("/getFiles/:id",[getFiles])
router.use("/meeting/",meeting);
router.use("/topic/", topic);
router.use("/test-endpoint", (req, res) => res.json({data: "hello", number:22}))
module.exports = router;