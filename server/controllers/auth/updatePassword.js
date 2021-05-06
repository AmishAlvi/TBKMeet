const {User} = require("../../models");
const bcrypt = require("bcryptjs");
module.exports = async (req,res) =>{

    try{
    console.log(req.session.user);
    await User.findOne({_id:req.session.user.userid}).then(async (user)=>{
        if(!req.fields.password){
            return res.status(400).json({msg:"Empty password"})
        }
        else{
        
        user.password = req.fields.password;
        await user.save((err)=>{
            if(err){return res.status(400).json({message: err.message});}
            else{
            return res.status(201).json({status:"success",message:"password changed successfully"});}

        });
    }
    });
}
catch(error){
    return res.status(400).json({message:error.message});
}
}