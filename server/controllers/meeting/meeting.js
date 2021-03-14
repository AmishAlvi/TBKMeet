const {Meeting} = require("../../models");


// TODO: add swagger
module.exports = async (req, res, _next) => {
  const {
    title,
    time,
    description,
    duration,
    location,
    date,
    topic,
    members,
    notes,
    owner

  } = req.fields;


  const meeting = new Meeting({title,time,description,duration,location,date,topic,members,notes,owner});
  try {
    meeting.owner = req.session.user;
    await meeting.save(async  (err) => {
      if (err) { return res.status(500).send({ msg: err.message }); }
      else{return res.status(200).json({status:"success",message:"The meeting is saved"});}
      
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
