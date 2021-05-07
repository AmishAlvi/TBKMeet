const {User} = require("../../models");

module.exports = async (req,res) =>{
    if(!req.session.userpass)return res.status(403).json({status:"forbidden"});
    await User.findOne({_id:req.session.userpass._id}).then(async (user)=>{
        console.log(req.session.userpass._id);
        console.log(user);
        user.password = req.fields.password;
        await user.save((err)=>{
            if(err){return res.status(400).json({message: err.message});}
            return res.status(201).json({status:"success",message:"password reset successfully"});

        });
    });
}