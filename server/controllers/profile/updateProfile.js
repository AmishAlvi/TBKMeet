const {User} = require("../../models");

module.exports = async (req, res, _next) => {
  await User.findByIdAndUpdate(req.user._id, req.fields);
  return res.sendStatus(204);
};
