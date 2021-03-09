const {Topic} = require("../../models");

module.exports = (req, res, _next) => {
    return Topic.find({}).
    then(topics=>{
        res.json({status:"success",data:topics});
    })
    .catch(error=>
        {
            res.status(400).json({status:"error",message:error.message});
    });
};
