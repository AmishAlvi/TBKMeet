const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const MeetingSchema = new Schema(
  {
    title: { type: String,require:true},
    time: { type: String,},
    date: { type: String,require:true} ,
    topic: { type:  ObjectId,required:true,ref:'Topic' },
    members:{type:[ObjectId],required:false,ref:"User"},
    notes:{type:String},
    oSwner:{type:ObjectId,required:false,ref:"User"}
  }
);

const Meeting = model("Meeting", MeetingSchema);

module.exports = {Meeting, MeetingSchema};