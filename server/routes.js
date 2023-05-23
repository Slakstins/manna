const express = require("express");
const AddressModel = require("./models");
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



app.get("/addresses", async (request, response) => {
  const addresses = await AddressModel.find({});

  // perfs.sort(function(a, b) {
    // return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
// });

  try {
    response.send(addresses);
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = app;