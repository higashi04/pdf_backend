const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const usersRoutes = require("./Routes/user");

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_SERVER,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SECRET,
  },
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

store.on("error", (e) => {
  console.log(e);
});
mongoose.connect(process.env.MONGO_SERVER);
mongoose.connection.on("connected", () => {
  console.log("mongo atlas connected");
});
mongoose.connection.on("error", (err) => {
  console.error("mongo error: \n", err);
});
app.use(cookieParser(process.env.SECRET));
app.use("/usuario", usersRoutes);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("backend app working")
    console.log("backend app connected")
}); 

app.listen(port, () => [console.log(`app running in port ${port}`)]);
