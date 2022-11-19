const mongoose = require("mongoose");

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

  console.log(process.env.MONGO_URL);
  console.log(MONGO_URL);

  mongoose.connection.once("open", () => {
    console.log("Connecting to mongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("Error", err);
  });

async function mongoConnect() {
  return await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
}  

module.exports = {
    mongoConnect
}
