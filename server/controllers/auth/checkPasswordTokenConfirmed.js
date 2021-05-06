
module.exports = async (req,res) =>{
    if(!req.session.userpass)return res.status(403).json({status:"forbidden"});
    else return res.status(201).json({status:"success",message:"tokenclicked"});
}