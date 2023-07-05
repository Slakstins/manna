const DriverModel = require("../models/driver");
// const req = require("express/lib/request");
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

function addDriverRoutes(app) {

    app.post("/api/driver", async (request, response) => {
        const driver = new DriverModel(request.body);
        // if (request.body.password){
        //   driver.password = encryptor.encrypt(request.body.password);
        // }
        try {
            await driver.save();
            response.send(driver);
        } catch (error) {
            response.status(500).send(error);
        }
    });



    app.post("/api/driver/account", async (request, response) => {
        const driver = new DriverModel(request.body);
        if (request.body.password) {
            driver.account = {
                password: encryptor.encrypt(request.body.password),
                email: request.body.email,
                moderator: false
            };
            driver.name = request.body.fname + " " + request.body.lname;
            driver.phone = request.body.phone;
        }
        else {
            throw Error("password not provided");
        }
        try {
            await driver.save();
            response.send(driver);
        } catch (error) {
            response.status(500).send(error);
        }
    });


    app.post("/api/driver/account/login", async (request, response) => {
        const driver = await DriverModel.findOne({ "account.email": request.body.email });
        if (!driver) {
            response.status(402).send({ message: "no driver account with email: " + request.body.email });
            return;
        }
        const driverAccount = driver.account;
        var decrypted = encryptor.decrypt(driverAccount.password);
        if (decrypted == request.body.password) {
            response.status(200).send(driver);
            return;
        }
        else {
            response.status(401).send({ message: "wrong password" });
        }
    });

    app.get("/api/driver/account/isModerator/(:email)", async (request, response) => {
        const driver = await DriverModel.findOne({ "account.email": request.params.email });

        if (!driver) {
            response.status(402).send({ message: "no driver account with email: " + request.params.email });
            return;
        }
        const driverAccount = driver.account;
        response.status(200).send({ "isModerator": driverAccount.moderator });
    });




    //accepts an email or an _id
    app.patch("/api/driver/(:id)/setDriving", async (req, res) => {
        try {
            let driver = await DriverModel.findById(req.params.id);
            if (driver == null) {
                throw new Error("no driver with id or email: " + req.params.id);
            }
            driver.driving = req.body.val;
            await driver.save();
            res.send(driver);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get("/api/driver/(:email)", async (req, res) => {
        try {
            driver = await DriverModel.findOne({ "account.email": req.params.email });
            if (driver == null) {
                throw new Error("no driver with email: " + req.params.email);
            }
            res.send(driver);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.patch("/api/driver/(:id)/setNotes", async (req, res) => {
        try {
            driver = await DriverModel.findById(req.params.id);
            if (driver == null) {
                throw new Error("no driver with id: " + req.params.id);
            }
            driver.notes = req.body.notes;
            await driver.save();
            res.send(driver);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.patch("/api/driver/setDrivingValsFalse", async (req, res) => {
        try {
            field = req.params.field;
            await DriverModel.updateMany({ driving: true }, { $set: { driving: false } });
            res.send({ message: "driving vals set to false" });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.patch("/api/driver/(:id)/set/(:field)", async (req, res) => {
        try {
            field = req.params.field;
            driver = await DriverModel.findById(req.params.id);
            if (driver == null) {
                throw new Error("no driver with id: " + req.params.id);
            }
            driver[field] = req.body[field];
            await driver.save();
            res.send(driver);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.delete('/api/driver/(:id)', async (req, res) => {
        try {
            msg = await DriverModel.findByIdAndRemove(req.params.id);
            if (msg == null) {
                throw new Error("no driver with id: " + req.params.id);
            } else {
                res.send(msg);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    })



    app.get("/api/drivers", async (request, response) => {

        console.log("made it");
        const drivers = await DriverModel.find({});
        // perfs.sort(function(a, b) {
        // return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
        // });

        try {
            console.log(drivers);
            response.send(drivers);
        } catch (error) {
            console.log(error);
            response.status(18).send(error);
        }
    });


}

module.exports = addDriverRoutes;