const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingSchema = new Schema(
  {
    title: { type: String,require:true},
    time: { type: String,},
    description: {type:String,require:true},
    duration: {type: String,require:true},
    date: { type: String,require:true},
    location:{type: String,require:true},
    topic: { type:[ObjectId],required:true,ref:'Topic' },
    members:{type:[ObjectId],required:true,ref:"User"},
    notes:{type:String},
    owner:{type:ObjectId,required:false,ref:"User"}
  }
);

const Meeting = model("Meeting", MeetingSchema);

module.exports = {Meeting, MeetingSchema};