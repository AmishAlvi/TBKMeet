const bcrypt = require("bcryptjs");

const {User} = require("../../models");

// TODO: add swagger
module.exports = async (req, res, _next) => {
  const instance = await User.findOne({email: req.fields.email}).lean();
  if (instance && bcrypt.compareSync(req.fields.password, instance.password)) {
    req.session["user"] = {userid: instance._id};
    delete instance.password;
    return res.json({status: 'success', data: instance});
  } else {
    return res
      .status(400)
      .json({status: "error", message: "No email-password match."});
  }
};
