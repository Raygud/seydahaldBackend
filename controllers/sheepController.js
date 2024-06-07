// controllers/sheepController.js
const db = require('../models');
const Sheep = db.Sheep;

const sheepController = {
    createSheep: async (req, res) => {
        try {
            const sheep = await Sheep.create(req.body);
            res.status(201).json(sheep);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSheep: async (req, res) => {
        try {
            const sheep = await Sheep.findByPk(req.params.id);
            if (sheep) {
                res.status(200).json(sheep);
            } else {
                res.status(404).send('Sheep not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = sheepController;
