const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const expressFormidable = require("express-formidable");
const session = require("cookie-session");
var path=require('path');
// const MongoStore = require("connect-mongo")(session);

const routes = require("./routes");
const mongoose = require("./models/db");

const sessionSecret = "The cake is a lie.";
const app = express();
app.use(express.static(path.join(__dirname, '../')));



app.use(helmet());

app.use(
  cors({
    origin: /.*/,
    credentials: true
  })
);
app.use(
  expressFormidable({
    maxFieldsSize: 10 * 1024 * 1024,
  })
);
app.use(
  session({
    name: "TBKMeet",
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    // store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // one week
      httpOnly: false
      // domain: 'remotify.com, *.remotify.com',  // TODO: verify it
    }
  })
);

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({status: "error", message: "No matching route"});
});

const port = process.env.PORT || 81;


app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
