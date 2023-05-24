const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
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
  delivery: {
    type: Boolean,
    required: false,
  }

});


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

const AddressModel = mongoose.model("Address", AddressSchema);
const DriverModel = mongoose.model("Driver", DriverSchema);

module.exports = AddressModel, DriverModel;