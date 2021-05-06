const {Meeting} = require("../../models");


// TODO: add swagger
module.exports = async (req, res, _next) => {
  const {
    title,
    description,
    duration,
    location,
    date,
    topic,
    members,
    notes,
    owner,
    isActive

  } = req.fields;



  try {
    await Meeting.findOne({_id:req.params.id}).then(async (meeting) =>{
        meeting.title = !title ? meeting.title : title;
        meeting.description = !description ? meeting.description : description;
        meeting.duration = !duration ? meeting.duration : duration;
        meeting.location = !location ? meeting.location : location;
        meeting.date = !date ? meeting.date:date;
        meeting.topic = !topic ? meeting.topic:topic;
        meeting.members = !members ? meeting.members : members;
        meeting.notes = !notes ? meeting.notes:notes;
        meeting.isActive = !isActive ? meeting.isActive : isActive;
        await meeting.save(async  (err) => {
            if (err) { return res.status(500).send({ msg: err.message }); }
            else{ return res.status(200).json({status:"success",message:"The meeting is modified"});}
      
        });
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
