const {User} = require("../../models");

module.exports = (req, res, _next) => {
  return User.findById(req.params["id"])
    .lean()
    .then(profile => {
      delete profile["emailConfirmed"];
      delete profile["password"];
      res.json({status: "success", data: profile});
    })
    .catch(error => {
      if (error.name == "CastError" && error.path == "_id") {
        res
          .status(400)
          .json({status: "error", message: "No user with given id"});
      } else {
        res.status(400).json({status: "error", message: error.message});
      }
    });
};
