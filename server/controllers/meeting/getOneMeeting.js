const {Meeting} = require("../../models");

module.exports = (req, res, _next) => {
    return Meeting.findOne({_id: req.params.id}).
    then(meetings=>{
        res.json({status:"success",data:meetings});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
