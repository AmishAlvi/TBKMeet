const {User,Token} = require("../../models");


module.exports = async (req, res, _next) => {
    Token.find({token: req.params.token}).then((tokens) =>{
        if (!tokens[0]) return res.send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
    
        User.findOne({ _id: tokens[0]._userId}).then((users)=>{
            if (!users) return res.send("No user with this token");
            if (users.emailConfirmed) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
            users.emailConfirmed = true;
            users.save(function (err) {
                if(err) {
                    res.error({msg:err.message});
                }
            });
            res.send("account verified");
        });
    
    });
};