const express = require("express");
const AddressModel = require("./models");
// const DriverModel = require("./models");
const req = require("express/lib/request");
const app = express();

app.post("/address", async (request, response) => {
    const address = new AddressModel(request.body);
  
    try {
      await address.save();
      response.send(address);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.patch("/address/(:id)/setDelivery", async (req, res) => {
    try {
      addr = await AddressModel.findById(req.params.id);
      if (addr == null){
        throw new Error("no address with id: " + req.params.id);
      }
      addr.delivery = req.body.val;
      await addr.save();
      res.send(addr);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.patch("/address/(:id)/setNotes", async (req, res) => {
    try {
      addr = await AddressModel.findById(req.params.id);
      if (addr == null){
        throw new Error("no address with id: " + req.params.id);
      }
      addr.notes = req.body.notes;
      await addr.save();
      res.send(addr);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.patch("/address/setDeliveriesFalse", async (req, res) => {
    try {
      field = req.params.field;
      await AddressModel.updateMany({delivery: true}, {$set: {delivery: false}});
      res.send({message: "deliveries set to false"});
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
});

app.patch("/address/(:id)/set/(:field)", async (req, res) => {
    try {
      field = req.params.field;
      addr = await AddressModel.findById(req.params.id);
      if (addr == null){
        throw new Error("no address with id: " + req.params.id);
      }
      addr[field] = req.body[field];
      await addr.save();
      res.send(addr);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.delete('/address/(:id)', async (req, res) => {
    try {
      msg = await AddressModel.findByIdAndRemove(req.params.id);
      if (msg == null){
        throw new Error("no address with id: " + req.params.id);
      } else {
        res.send(msg);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })



app.get("/address/all", async (request, response) => {
  const addresses = await AddressModel.find({});
  console.log(addresses);

  // perfs.sort(function(a, b) {
    // return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
// });

  try {
    response.send(addresses);
  } catch (error) {
    response.status(500).send(error);
  }
});



app.post("/driver", async (request, response) => {
    const driver = new DriverModel(request.body);
  
    try {
      await driver.save();
      response.send(driver);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.patch("/driver/(:id)/setDriving", async (req, res) => {
    try {
      driver = await DriverModel.findById(req.params.id);
      if (driver == null){
        throw new Error("no address with id: " + req.params.id);
      }
      driver.driving = req.body.val;
      await driver.save();
      res.send(driver);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.patch("/driver/(:id)/setNotes", async (req, res) => {
    try {
      driver = await DriverModel.findById(req.params.id);
      if (driver == null){
        throw new Error("no driver with id: " + req.params.id);
      }
      driver.notes = req.body.notes;
      await driver.save();
      res.send(driver);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.patch("/driver/setDrivingValsFalse", async (req, res) => {
    try {
      field = req.params.field;
      await DriverModel.updateMany({driving: true}, {$set: {driving: false}});
      res.send({message: "driving vals set to false"});
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
});

app.patch("/driver/(:id)/set/(:field)", async (req, res) => {
    try {
      field = req.params.field;
      driver = await DriverModel.findById(req.params.id);
      if (driver == null){
        throw new Error("no driver with id: " + req.params.id);
      }
      driver[field] = req.body[field];
      await driver.save();
      res.send(driver);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.delete('/driver/(:id)', async (req, res) => {
    try {
      msg = await DriverModel.findByIdAndRemove(req.params.id);
      if (msg == null){
        throw new Error("no driver with id: " + req.params.id);
      } else {
        res.send(msg);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })



app.get("/driver/all", async (request, response) => {
  const drivers = await DriverModel.find({});

  // perfs.sort(function(a, b) {
    // return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
// });

  try {
    response.send(drivers);
  } catch (error) {
    response.status(500).send(error);
  }
});




module.exports = app;