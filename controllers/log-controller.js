const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session.js');
const Log = sequelize.import('../models/log');

/******CREATE NEW WORKOUT******/
router.post('/', validateSession, (req, res) => {
    console.log(req.body);
    if (!req.error) {
        let description= req.body.log.description;
        let definition = req.body.log.definition;
        let results = req.body.log.results;
        let thawing = req.body.log.thawing;
        let marinade = req.body.log.marinade;
        let cooling = req.body.log.cooling;
        let owner = req.body.log.id;   // changes from req.body.log.id:


        Log.create({
                description: description,
                definition: definition,
                results: results,
                thawing: thawing,
                marinade: marinade,
                owner_properties: owner,
                cooling: cooling,

            })
            .then(
            function () {
                    console.log("created")
                    res.json({ message: "Success" });
                },
            function (err) {
                    console.log("err")
                    console.log(err);
                }
            )
    } else {
        res.status(500).json(error)
    }
});


/******GET ALL WORKOUTS******/
router.get('/', (req, res) => {
    Log.findAll()
        .then(log => res.status(200).json(log))
        .catch(error => res.status(500).json(error))
});

/******GET WORKOUT BY ID******/
router.get('/:id', (req, res) => {
    Log.findOne({ where: { id: req.params.id } })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

/******UPDATE WORKOUT BY ID******/
router.put('/:id', (req, res) => {
    console.log(req.user)
    console.log(req.params.id)
    if (!req.errors) {
        Log.update({
            description: req.body.log.description,
            definition: req.body.log.definition,
            results: req.body.log.results,
            owner_properties: req.user.id,
            thawing: req.body.log.thawing,
            marinade: req.body.log.marinade,
            cooling: req.body.log.cooling,

        }, { where: { id: req.params.id } })
            .then(log => res.status(200).json(log))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(500).json(req.error)
    }
})

/******DELETE WORKOUT BY ID******/
router.delete('/:id', (req, res) => {
    if (!req.errors) {
        Log.destroy({ where: { id: req.params.id } })
            .then(log => res.status(200).json(log))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})
module.exports = router;