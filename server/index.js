require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const usersRouter = require("./users/route");
const authRoute = require("./auth/route");
const postsRouter = require("./posts/route");
const fileLogger = require("./middleware/fileLogger");
const sendError = require("./utils/sendError");

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(chalk.yellow("Conect to mongo db"));
  })
  .catch((err) => {
    console.log("Conect Regected", err);
  });

const app = express();

app.use(require("morgan")("dev"));
app.use(cors());
app.use(express.json());
app.use(fileLogger);
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/auth", authRoute);
app.use("/posts", postsRouter);

app.all("*", (req, res) => {
  sendError(res, 404, "Page not found.");
  return;
});

const PORT = process.env.PORT;
app.listen(PORT, console.log(chalk.blue("Listening on port", PORT)));
