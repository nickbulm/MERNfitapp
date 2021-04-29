const express = require('express');
const app = new express();
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors_app = require('cors');
const db = require("./db");
const PORT = 4000;
const userRouter = require("./routes/user-router");
const programRouter = require("./routes/program-router");
const workoutRouter = require("./routes/workout-router");
const sessionRouter = require("./routes/session-router");
dotenv.config()
app.use(express.static('client'))
app.use(cors_app());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
process.env.TOKEN_SECRET; 


db.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(passport.initialize());
require("./db/passport")(passport);


app.use("/api", [
    programRouter,
    workoutRouter,
    sessionRouter,
    userRouter,
  ]);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});