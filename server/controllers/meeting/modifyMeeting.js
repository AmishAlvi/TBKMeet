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


  const meeting = new Meeting({title,description,duration,location,date,topic,members,notes,owner,isActive});
  try {
    Meeting.findOne({_id:req.params.id}).then(async (meeting1) =>{
        meeting1 = meeting;
        await meeting1.save(async  (err) => {
            if (err) { return res.status(500).send({ msg: err.message }); }
            else{ return res.status(200).json({status:"success",message:"The meeting is saved"});}
      
        });
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
