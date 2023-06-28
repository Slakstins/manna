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
  },
  account: {
    type: Object,
    required: false,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    moderator: {
      type: Boolean,
      required: true
    }
  }
});

const DriverModel = mongoose.model("Driver", DriverSchema);

module.exports = DriverModel;