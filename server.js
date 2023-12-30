const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const nocache = require("nocache");

const app = express();
const port = process.env.PORT || 8000;

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//load static assets
app.use("/static", express.static(path.join(__dirname, "public")));

//prevent backward
app.use(nocache());
//sessiion middleware
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }, // session timeout of 60 seconds
  })
);

//router middleware
app.use("/", router);

///
app.listen(port, () => {
  console.log("server started");
});
