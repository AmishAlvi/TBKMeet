const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingFileSchema = new Schema(
  {
    _meetingId: { type:  ObjectId,ref:'Meeting' },
    fileName: { type: String}
  });

const MeetingFile = model("MeetingFile", MeetingFileSchema);

module.exports = {MeetingFile, MeetingFileSchema};