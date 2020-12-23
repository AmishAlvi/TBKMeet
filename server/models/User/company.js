const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Cannot create a company without name"],
      index: true
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: "User"
    }
    // TODO: add other fields
    ,team:{
      type:[ObjectId],
      required:false,
      ref:"User"
    }
  },
  {timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}}
);

const Company = model("Company", CompanySchema);

module.exports = {Company, CompanySchema};
