const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  LastName: {
    required: true,
    type: String,
  },
  R_LastName: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("koreanlastname", dataSchema);
