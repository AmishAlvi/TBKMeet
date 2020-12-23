const {Router} = require("express");

const authRouter = require("./auth");
const profileRouter = require("./profile");
const meeting = require("./meeting");
const router = Router();

router.use("/auth/", authRouter);
router.use("/profile/", profileRouter);
router.use("/meeting/", meeting);
router.use("/test-endpoint", (req, res) => res.json({data: "hello", number:22}))
module.exports = router;