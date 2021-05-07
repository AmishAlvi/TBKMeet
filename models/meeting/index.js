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
    status: {
      type: String,
      enum: [
        "notStarted",
        "started",
        "ended"
      ],
      default: "notStarted",
      required: true
    },
    owner:{type:ObjectId,require:true,ref:"User"},
    duration:{type: String, require: true}
  }
);

const Meeting = model("Meeting", MeetingSchema);

module.exports = {Meeting, MeetingSchema};