const express = require("express");
const cors = require("cors");
const path = require("path");
const planetsRouter = require("./src/routes/planets/planets.routes");
const app = express();
const morgan = require("morgan");
const { launchRouter } = require("./src/routes/launches/launches.routes");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(planetsRouter);
app.use(launchRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,"..","server","build" , "index.html"));
});

module.exports = app;
