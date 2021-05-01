const {Topic} = require("../../models");

module.exports = (req, res, _next) => {
    return Topic.findOne({_id: req.params.id}).
    then(topic=>{
        res.json({status:"success",data:topic});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
