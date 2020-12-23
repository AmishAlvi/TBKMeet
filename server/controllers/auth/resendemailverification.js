const {User,Token} = require("../../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const email1 = require("../../config/prod").email;
const password1 = require("../../config/prod").password;


module.exports = async (req, res, _next) =>{

    await User.findOne({email:req.fields.email}).then(async (user)=>{
        if (!user) return res.sts(400).send({ msg: 'We were unable to find a user with that email.' });
        if(!user.emailConfirmed) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token for this user
        const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        await token.save( (err) => {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            //put email and password in the .env file
            var transporter = nodemailer.createTransport({ host:"webmail.remotify.co",port:465, secure:true, //Force TLS
            tls: {
                rejectUnauthorized: false
            }, auth: { user: email1, pass: password1 } });//add emails, and passwords from keys or env
            var mailOptions = { from: email1, to: user.email, subject: 'Account Verification', text: 'Hello,\n\n' + 'Please verify your remotify account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirmation\/' + token.token + '\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                return res.send('password reset token has been sent to ' + user.email + '.');
            });
        });
    });

};