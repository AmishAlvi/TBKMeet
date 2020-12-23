const {model, Schema} = require("../db");
const {ObjectId} = Schema.Types;

const TokenSchema = new Schema(
  {
    _userId: { type:  ObjectId,required:true,ref:'User' },
    token: { type: String,require:true},
    createdAt: { type: Date, default: Date.now, expires: 1000000  }
  },
);

const Token = model("Token", TokenSchema);

module.exports = {Token, TokenSchema};