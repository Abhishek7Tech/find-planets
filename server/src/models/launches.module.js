 const axios = require("axios");
const launches = new Map();
const launch = require("./launches.mongo");

let latestFlightNumber = 100;

const launchOne = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launchOne);

async function saveLaunch(launche) {
  const response = await launch.updateOne(
    {
      flightNumber: launche.flightNumber,
    },
    launche,
    {
      upsert: true,
    }
  );
  return response;
}

async function getLaunches(skip,limit) {
  // return Array.from(launches.values());
  const response = await launch.find(
    {},
    {
      _id: 0,
      __V: 0,
    }
  ).skip(skip)
  .limit(limit)
  .sort({flightNumber: 1});
  console.log("SKIP & LIMIT",skip,limit);
  return response;
}

const SPACEX_URL = "https://api.spacexdata.com/v5/launches/query";

async function populateDataBase() {
  const response = await axios.post(SPACEX_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            name: 1,
          },
        },
      ],
    },
  });

  if(response.status !== 200){
    console.log("Error Loading____");
  }
  const launchData = response.data.docs;
  console.log(launchData);

  for (const launched of launchData) {
    const payload = launched["payloads"];
    const customer = payload.flatMap((payload) => {
      console.log(payload);
      return payload["customer"];
    });

    const launch = {
      flightNumber: launched["flight_number"],
      mission: launched["name"],
      rocket: launched["rocket"]["name"],
      launchDate: launched["date_local"],
      upcoming: launched["upcoming"],
      success: launched["success"],
      customer,
    };
   await saveLaunch(launch);
    // console.log(launch.mission);
  }
}

async function launchExsist(filter) {
  const response = await launch.findOne(filter);
  return response;
}

async function loadLaunchesData() {
  console.log("Loading Launches Data...");
  const response = await launchExsist({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  console.log("Response", response);
  if (response) {
    console.log("Already exsist");
  } else {
    const launchData = await populateDataBase();
    return launchData;
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launch.findOne().sort("-flightNumber");
  console.log("Latest", latestLaunch);
  if (!latestLaunch) {
    return latestFlightNumber;
  }

  return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
  const flightNumber = await getLatestFlightNumber();
  latestFlightNumber = flightNumber + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ["ISRO", "NASA"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

async function isValidId(id) {
  console.log(launches.has(id));
  const isValid = await launch.find({
    flightNumber: id,
  });
  return isValid;
}

async function abortLaunchById(id) {
  // return launches.delete(id);
  const aborted = launch.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  return aborted;
}

module.exports = {
  getLaunches,
  addNewLaunch,
  isValidId,
  abortLaunchById,
  loadLaunchesData,
};
