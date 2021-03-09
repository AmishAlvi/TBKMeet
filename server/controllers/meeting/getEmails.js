const {User} = require("../../models");

module.exports = (req, res, _next) => {
    return User.find({}).
    then(users=>{
        delete users["password"];
        delete users["isActive"];
        delete users["emailConfirmed"];
        res.json({status:"success",data:users});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};