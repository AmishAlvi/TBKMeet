const {User} = require("../models");

async function requireAuthentication(req, res, next) {
  if ("user" in req.session) {
    next();
  } else {
    res.sendStatus(403);
  }
}

async function requireAuthenticationAndAttachUser(req, res, next) {
  if ("user" in req.session) {
    const user = await User.findById(req.session.user.userid).lean();
    req.user = user;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  requireAuthentication,
  requireAuthenticationAndAttachUser
};
