const {MeetingFile} = require("../models");

module.exports = (req, res, _next) => {
    return MeetingFile.find({status:req.params.id}).
    then(meetingFiles=>{
        console.log(req.params.id)
        res.json({status:"success",data:meetingFiles});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
