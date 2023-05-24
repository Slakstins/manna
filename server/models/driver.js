const mongoose = require("mongoose");


const DriverSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  driving: {
    type: Boolean,
    required: false,
  }

});

const DriverModel = mongoose.model("Driver", DriverSchema);

module.exports = DriverModel;