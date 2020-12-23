const {User, Token} = require("../../models");

module.exports = async (req,res,next) =>{
    if(!req.params.token1){
        return res.status(500).json({message:'Token is required'});
    }
    await Token.findOne({token:req.params.token1}).then(async (token1)=>{
       if(!token1)return res.status(409).json({message:"token expired"});
       await User.findOne({_id:token1._userId}).then((user)=>{
           if(!user)return res.status(409).json({message:"no user with this one"});
           req.session.userpass = user;
           res.send("ok");
        });
       
    });
}