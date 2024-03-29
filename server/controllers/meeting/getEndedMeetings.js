const {Meeting} = require("../../models");

module.exports = (req, res) => {
    return Meeting.find({status:"ended",owner:req.session.user._id}).
    then(meetings=>{
        res.json({status:"success",data:meetings});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
