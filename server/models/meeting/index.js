const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingSchema = new Schema(
  {
    title: { type: String,require:true},
    time: { type: String,require:true},
      date: { type: String,require:true} ,
    topic: { type:  ObjectId,require:true,ref:'Topic' },
    members:{type:[ObjectId],require:false,ref:"User"},
    notes:{type:String},
    oSwner:{type:ObjectId,require:false,ref:"User"}
  }
);

const Meeting = model("Meeting", MeetingSchema);

module.exports = {Meeting, MeetingSchema};