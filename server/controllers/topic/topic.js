const {Topic} = require("../../models");


// TODO: add swagger
module.exports = async (req, res, _next) => {
  const {
    title,
    description,
    totalTime
  } = req.fields;


  const topic = new Topic({title,description,totalTime});
  try {

    await topic.save(async  (err) => {
      if (err) { return res.status(500).send({ msg: err.message }); }
      else{return res.status(200).json({status:"success",message:"The topic is saved"});}
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
