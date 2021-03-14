const {Meeting} = require("../../models");
const nodemailer = require("nodemailer");
const email1 = require("../../config/prod").email;
const password1 = require("../../config/prod").password;

// TODO: add swagger
module.exports = async (req, res, _next) => {
  const {
    title,
    //time,
    description,
    duration,
    location,
    date,
    topic,
    members,
    notes,
    owner

  } = req.fields;


  const meeting = new Meeting({title,description,duration,location,date,topic,members,notes,owner});
  try {
    meeting.owner = req.session.user;
    await meeting.save(async  (err) => {
      if (err) { return res.status(500).send({ msg: err.message }); }
      else{
        var transporter = nodemailer.createTransport({ host:"smtp.gmail.com",port:465, secure:true, //Force TLS
      tls: {
          rejectUnauthorized: false
      }, auth: { user: email1, pass: password1 } });//add emails, and passwords from keys or env
        /*   for(var i = 0;i<members.length;i++){
          await User.findOne({_id:members[i]}).then((user) =>{
            if(!user)return res.status(409).json({message:"no user found"});
      var mailOptions = { from: email1, to: user.email, subject: 'Meeting Invitation', text: 'this is a good sign' };
      transporter.sendMail(mailOptions, function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
      });
    });

    }   */
        return res.status(200).json({status:"success",message:"The meeting is saved"});}
      
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
