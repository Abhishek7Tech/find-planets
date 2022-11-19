const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  planets: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet",planetsSchema);