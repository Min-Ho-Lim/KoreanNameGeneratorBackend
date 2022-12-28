const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  FastName: {
    required: true,
    type: String,
  },
  R_FastName: {
    required: true,
    type: String,
  },
  Syllable: {
    required: true,
    type: String,
  },
  "Masculine:Feminine": {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("koreanname", dataSchema);
