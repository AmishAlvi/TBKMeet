const fs = require('fs');
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
require('dotenv').config();
const BUCKET_NAME ='tbkawsbucket';

module.exports = async(req,res)=>{
    try{

    const fileContent = fs.createReadStream(req.files.fileName.path);
    fileContent.on('error', function(err) {
        console.log('File Error', err);
      });
      AWS.config.update({
        accesskeyId:'AKIAYC64MUG3SG576255',
        secretAccessKey:'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'
      });
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    const params = {
        Bucket:BUCKET_NAME,
        Key:uuid(),
        Body:fileContent
    };
    await s3.upload(params,function(err,data){
        if(err){
            return res.status(400).send({msg: err.message});
        }
        else{
            return res.status(200).send(`file uploaded successfull ${data.location}` );
        }
    });
} catch(error){
    return res.status(400).json({status: "error", message: error.message});
}
}