const mongoose = require("mongoose");


const DriverAccountSchema = new mongoose.Schema({
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

});

const DriverAccountModel = mongoose.model("DriverAccount", DriverAccountSchema);

module.exports = DriverAccountModel;