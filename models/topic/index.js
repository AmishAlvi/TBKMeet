const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;
const opts = { toJSON: { virtuals: true } };

const TopicSchema = new Schema(
  {
    title: { type: String,require:true},
    description: { type: String},
    totalTime: { type: String,require:true},
    category:{type:String,require:true},
    decision:{type:Boolean,default:false},
    information:{type:Boolean,default:false} 
  },opts
);
TopicSchema.virtual("id").get(function() {
  return this._id;
});

const Topic = model("Topic", TopicSchema);

module.exports = {Topic, TopicSchema};