const bcrypt = require("bcryptjs");

const {User} = require("../../models");

// TODO: add swagger
module.exports = async (req, res) => {
    if(!req.session.user) return res.status(400).json({status:"error",message:"no user logged in."});
    else {
        delete req.session.user;
        return res.status(200).json({status:"success",message:"The user logged out."})
    }
};
