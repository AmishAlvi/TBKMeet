const {Router} = require("express");

const {updateProfile, profileDetails} = require("../controllers/profile");
const {
  requireAuthenticationAndAttachUser,
  validateJson
} = require("../middleware");

const router = Router();

router.patch("/", [
  requireAuthenticationAndAttachUser,
  validateJson({
    properties: {
      password: {type: "string", minLength: 6, maxLength: 20},
      firstName: {type: "string", minLength: 2, maxLength: 30},
      lastName: {type: "string", minLength: 2, maxLength: 30}
    }
  }),
  updateProfile
]);

router.get("/:id", profileDetails);

module.exports = router;
