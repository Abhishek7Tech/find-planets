const express = require("express");
const {
  getAllLaunches,
  addANewLaunch,
  abortALaunch
} = require("../launches/launches.controller");
const launchRouter = express.Router();

launchRouter.get("/launches", getAllLaunches);
launchRouter.post("/launches", addANewLaunch);
launchRouter.delete("/launches/:id", abortALaunch)
module.exports = {
  launchRouter,
};
