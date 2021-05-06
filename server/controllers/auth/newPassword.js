const {User} = require("../../models");

module.exports = async (req,res) =>{
    if(!req.session.userpass)return res.status(403).json({status:"forbidden"});
    await User.findOne({Id:req.session.userpass.Id}).then(async (user)=>{
        user.password = req.fields.newPassword;
        await user.save((err)=>{
            if(err){return res.status(400).json({message: err.message});}
            return res.status(201).json({status:"success",message:"password reset successfully"});

        });
    });
}