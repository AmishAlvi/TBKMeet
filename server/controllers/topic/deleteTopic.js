const {Topic} = require("../../models");

module.exports = (req, res) => {
    return Topic.deleteOne({_id: req.params.id}).
    then(topics=>{
        res.json({status:"success",data:topics});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
