const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');

// Get all drivers
router.get('/getAllDrivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get driver by driverNumber
router.get('/getDriverByNumber/:driverNumber', async (req, res) => {
    
    try {
        const driver = await Driver.find({driverNumber: req.params.driverNumber});
        res.status(200).json(driver);
    } catch (error) {
        res.status(404).send({ message: 'Driver not found' });
    }
});

// Add a driver
router.post('/addDriver', async (req, res) => {
    const driver = new Driver({
        name: req.body.name,
        driverNumber: req.body.driverNumber,
        team: req.body.team
    });

    try {
        const addedDriver = await driver.save();
        res.status(201).json(addedDriver);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Update a driver
router.patch('/updateDriver/:id', async (req, res) => {

    try {
        const driver = await Driver.findById(req.params.id);

        if (driver == null) {
            return res.status(404).send({message: 'Update failed because Driver not could not be found'});
        }

        if (req.body.name != null) {
            driver.name = req.body.name;
        }
    
        if (req.body.driverNumber != null) {
            driver.driverNumber = req.body.driverNumber;
        }
    
        if (req.body.team != null) {
            driver.team = req.body.team;
        }

        const updatedDriver = await driver.save();
        res.json(updatedDriver);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete('/deleteDriver/:id', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);

        if (driver == null) {
            return res.status(404).send({message: 'Update failed because Driver not could not be found'});
        }

        await driver.delete();
        res.status(200).send({message: 'Driver deleted'});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = router;