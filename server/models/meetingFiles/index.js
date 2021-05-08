const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingFileSchema = new Schema(
  {
    _meetingId: { type:  ObjectId,require:true,ref:'Meeting' },
    fileName: { type: String},
    name:{type:String}
  });

const MeetingFile = model("MeetingFile", MeetingFileSchema);

module.exports = {MeetingFile, MeetingFileSchema};