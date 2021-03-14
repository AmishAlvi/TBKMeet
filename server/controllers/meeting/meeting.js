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
      else{
        for(var i = 0;i<members.length;i++){
          await User.findOne({_id:members[i]}).then((user) =>{
        var transporter = nodemailer.createTransport({ host:"webmail.remotify.co",port:465, secure:true, //Force TLS
      tls: {
          rejectUnauthorized: false
      }, auth: { user: email1, pass: password1 } });//add emails, and passwords from keys or env
      var mailOptions = { from: email1, to: user.email, subject: 'Account Verification', text: 'Hello,\n\n' + 'Please verify your remotify account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token.token + '\n' };
      transporter.sendMail(mailOptions, function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
      });
    });
    }
        return res.status(200).json({status:"success",message:"The meeting is saved"});}
      
    }); 
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
