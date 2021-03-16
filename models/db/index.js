const mongoose = require("mongoose");

const {mongoDbUrl} = require("../../config");

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  autoIndex: false,
  useUnifiedTopology: true,
  useFindAndModify: false
});

module.exports = mongoose;
