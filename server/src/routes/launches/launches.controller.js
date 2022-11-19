const {
  getLaunches,
  addNewLaunch,
  isValidId,
  abortLaunchById,
} = require("../../models/launches.module");
const { getPagination } = require("../../services/query");


async function getAllLaunches(req, res) {
  const {skip, limit} = getPagination(req.query);
  const response = await getLaunches(skip,limit);
  return res.status(200).json(response);
}

async function addANewLaunch(req, res) {
  const launch = req.body;
  console.log(launch.launchDate);
  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date!",
    });
  }

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing property!",
    });
  }
      const response = await addNewLaunch(launch);
  return res.status(201).json(response);
}

async function abortALaunch(req, res) {
  const id = +req.params.id;
  const isValid = await isValidId(id);
  if (!isValid) {
    return res.status(404).json({
      error: "Launch not found!",
    });
  }
   await abortLaunchById(id);
  return res.status(200).json({message: "Deleted"});
}

module.exports = {
  getAllLaunches,
  addANewLaunch,
  abortALaunch,
};
