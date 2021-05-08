const {Meeting, User} = require("../../models");


module.exports = async (req, res, _next) => {
    Meeting.findOne({_id: req.params.id}).then((meeting) =>{
            if (!meeting) return res.status(400).send("No meeting found.");
            if (meeting.isStarted) return res.status(400).send({ type: 'already-started', msg: 'This meeting has already started.' });
            meeting.status = "ended";
            meeting.save(function (err) {
                if(err) {
                    res.error({msg:err.message});
                }
            });
            res.status(200).send({status:"success",message:"meeting Ended"});
        });
};