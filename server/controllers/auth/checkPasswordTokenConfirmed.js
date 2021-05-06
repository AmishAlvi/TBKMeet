module.exports = async (req,res) =>{
    try{
    if(!req.session.userpass)return res.status(403).json({status:"forbidden"});
    else {
        if(req.session.userpass.email == req.fields.email){
            return res.status(201).json({status:"success",message:"tokenclicked"});
        }
        else{
            return res.status(403).json("cannout eacces this");
        }
    }
}
catch(error){
    return res.status(400).json({msg:error.message});
}
}