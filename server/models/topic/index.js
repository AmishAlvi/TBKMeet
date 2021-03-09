const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const TopicSchema = new Schema(
  {
    title: { type: String,require:true},
    description: { type: String},
    totalTime: { type: String,require:true}  
  }
);

const Topic = model("Topic", TopicSchema);

module.exports = {Topic, TopicSchema};