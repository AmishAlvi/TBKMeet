const {Meeting} = require("../../models");

module.exports = (req, res, _next) => {
    return Meeting.find({status:["notStarted","started"]}).
    then(meetings=>{
        res.json({status:"success",data:meetings});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
