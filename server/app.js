const express = require("express");
const models = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const { graphqlHTTP } = require("express-graphql");
const passportConfig = require("./services/auth");
const schema = require("./schemas/schema");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(
  cors({
    origin: "*",
  })
);

// * Configures express to use sessions.  This places an encrypted identifier
// * on the users cookie.  When a user makes a request, this middleware examines
// * the cookie and modifies the request object to indicate which user made the request
// * The cookie itself only contains the id of a session; more data about the session
// * is stored inside of MongoDB.
console.log("URL", process.env.MONGO_URL);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      autoRemove: "native",
      collectionName: "sessions",
    }),
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
