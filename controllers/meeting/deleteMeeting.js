const {Meeting} = require("../../models");

module.exports = (req, res) => {
    return Meeting.deleteOne({_id: req.params.id}).
    then(meetings=>{
        res.json({status:"success",data:meetings});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
