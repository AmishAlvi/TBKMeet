const fs = require('fs');
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
require('dotenv').config();
const BUCKET_NAME ='tbkawsbucket';
const {MeetingFile} = require('../models');
const { meeting } = require('../controllers/meeting');
module.exports = async(req,res)=>{
    try{

    const fileContent = fs.createReadStream(req.files.fileName.path);
    fileContent.on('error', function(err) {
        console.log('File Error', err);
    });
    var fileType = (req.files.fileName.name).split(".");
    AWS.config.credentials = {
        "accessKeyId": 'AKIAYC64MUG3SG576255',
        "secretAccessKey":'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'
    }
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });

    const params = {
        Bucket:BUCKET_NAME,
        Key:uuid(),
        Body:fileContent
    };
    params.Key += `.${fileType[fileType.length-1]}`;
    await s3.upload(params,function(err,data){
        if(err){
            return res.status(400).send({msg: err.message});
        }
        else{
            const _meetingId = req.fields.meetingId;
              const name = req.files.fileName.name;
              fileName = data.Location;
            const meetingFile = new MeetingFile({_meetingId,fileName,name});
            meetingFile.save((err)=>{
                if(err){return res.status(400).send({msg:err.message})}
                else{
                    return res.status(200).send({location: data.Location });
                }
            });
        }
    });
} catch(error){
    return res.status(400).json({status: "error", message: error.message});
}
}