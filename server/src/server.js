const http = require("http");
const { loadPlanetsData } = require("./models/planets.model");
const {loadLaunchesData} = require("./models/launches.module");
const { mongoConnect } = require("./services/mongo");


const app = require("../app");
const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  try {
     await loadPlanetsData;
     await loadLaunchesData();
  } catch (err) {
    console.log(err);
  }
  server.listen(PORT, () => {
    console.log("listening to", PORT);
  });
}

startServer();
