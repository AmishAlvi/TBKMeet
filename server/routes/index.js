const {Router} = require("express");

const authRouter = require("./auth");
const profileRouter = require("./profile");
const router = Router();

router.use("/auth/", authRouter);
router.use("/profile/", profileRouter);
router.use("/test-endpoint", (req, res) => res.json({data: "hello", number:22}))
module.exports = router;