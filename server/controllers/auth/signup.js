const {User, Company, Project,Token} = require("../../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const email1 = require("../../config/prod").email;
const password1 = require("../../config/prod").password;


// TODO: add swagger
module.exports = async (req, res, _next) => {
  const {
    firstName,
    lastName,
    password,
    email,
    companyName,
    projectTitle,
    projectDescription
  } = req.fields;


  const user = new User({firstName, lastName, password, email});
  try {
    await user.validate();
    const company = new Company({name: companyName, owner: user});
    user.company = company._id;

    await user.save(async  (err) => {
      if (err) { return res.status(500).send({ msg: err.message }); }

      // Create a verification token for this user
      const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the verification token
      await token.save( (err) => {
          if (err) { return res.status(500).send({ msg: err.message}); }
          // Send the email
          //put email and password in the .env file
          var transporter = nodemailer.createTransport({ host:"webmail.remotify.co",port:465, secure:true, //Force TLS
          tls: {
              rejectUnauthorized: false
          }, auth: { user: email1, pass: password1 } });//add emails, and passwords from keys or env
          var mailOptions = { from: email1, to: user.email, subject: 'Account Verification', text: 'Hello,\n\n' + 'Please verify your remotify account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token.token + '\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              return res.send('A verification email has been sent to ' + user.email + '.');
          });
      });
  }); // no error raises, as the document is validated before
    await company.save();
    if (projectDescription && projectTitle) {
      await new Project({
        title: projectTitle,
        description: projectDescription,
        company
      }).save();
    }
    
  } catch (error) {
    return res.status(400).json({status: "error", message: error.message});
  }
};
