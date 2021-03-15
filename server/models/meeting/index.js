const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingSchema = new Schema(
  {
    title: { type: String,require:true},
    date: { type: Date,require:true} ,
    location: { type: String,require:true},
    description: { type: String,require:false} ,
    topic: { type:[ObjectId],require:true,ref:'Topic' },
    members:{type:[ObjectId],require:true,ref:"User"},
    notes:{type:String},
    isStarted:{type:Boolean,default:false},
    owner:{type:ObjectId,require:false,ref:"User"}
  }
);

const Meeting = model("Meeting", MeetingSchema);

module.exports = {Meeting, MeetingSchema};