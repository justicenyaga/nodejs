const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const logger = require("./middleware/logger");
const config = require("config");
const debug = require("debug")("app:startup");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

console.log("App Name: ", config.get("name"));
console.log("Mail Server: ", config.get("mail.host"));
console.log("Mail Password: ", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled.");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
