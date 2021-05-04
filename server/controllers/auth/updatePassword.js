const {User} = require("../../models");

module.exports = async (req,res) =>{
    await User.findOne({Id:req.session.user.userId}).then(async (user)=>{
        user.password = req.fields.password;
        await user.save((err)=>{
            if(err){return res.status(400).json({message: err.message});}
            return res.status(201).json({message:"password changed successfully"});

        });
    });
}