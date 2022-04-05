const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// Get all teams
router.get('/getAllTeams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get team by name
router.get('/getTeamByName/:teamName', async (req, res) => {
    try {
        const team = await Team.find({ name: req.params.teamName.trim() });
        res.status(200).json(team);
    } catch (error) {
        res.status(404).send({ message: 'Team not found' });
    }
});

// Add a team
router.post('/addTeam', async (req, res) => {
    const team = new Team({ name: req.body.name });

    try {
        const addedTeam = await team.save();
        res.status(201).json(addedTeam);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Update a team
router.patch('/updateTeam/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (team == null) {
            return res.status(404).send({ message: 'Update failed because Team could not be found' });
        }

        if (team.name != null) {
            team.name = req.body.name;
        }

        const updatedTeam = await team.save();

        res.json(updatedTeam);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Deleting a team
router.delete('/deleteTeam/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (team == null) {
            return res.status(404).send({ message: 'No such team exists' });
        }

        const deletedTeam = await team.delete();
        res.status(200).send({ message: 'Team deleted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;