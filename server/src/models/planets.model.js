const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planet = require("./planets.mongo");
const habitablePlanets = [
  "Kepler-1652 b",
  "Kepler-1410 b",
  "Kepler-296 A f",
  "Kepler-442 b",
  "Kepler-296 A e",
  "Kepler-1649 b",
  "Kepler-62 f",
  "Kepler-452 b",
];

const loadPlanetsData = savePlanets(habitablePlanets);
// // const habitablePlanets = [];
// function isHabitablePlanet(planet) {
//   return (
//     planet["koi_disposition"] === "CONFIRMED" &&
//     planet["koi_insol"] > 0.36 &&
//     planet["koi_insol"] < 1.11 &&
//     planet["koi_prad"] < 1.6
//   );
// }

//   function loadPlanetsData() {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(path.join(__dirname,"..","..","data", "./kepler_data.csv"))
//       .pipe(
//         parse({
//           comment: "#",
//           columns: true,
//         })
//       )
//       .on("data", (data) => {
//         if (isHabitablePlanet(data)) {
//           habitablePlanets.push(data);
//         }
//       })
//       .on("error", (err) => {
//         console.log(err);
//         reject(err);
//       })
//       .on("end", () => {
//         habitablePlanets.map((data) => console.log("Planets",data.kepler_name));
//         console.log(`${habitablePlanets.length} habitable planets found!`);
//           resolve();
//     });
//   });
// }

function savePlanets(planets) {
  return planets.map(async (planets) => {
    console.log(planets);
    try {
      await planet.updateOne(
        {
          planets: planets,
        },
        {
          planets: planets,
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  });
}

async function planets() {
  const response = await planet.find({},{
    _id:0,
    __v:0
  });
  return response;
}
module.exports = {
  loadPlanetsData,
  planets,
};
