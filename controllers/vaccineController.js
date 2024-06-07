// controllers/vaccineController.js
const db = require('../models');
const Vaccine = db.Vaccination;

const vaccineController = {
    createVaccine: async (req, res) => {
        try {
            const vaccine = await Vaccine.create(req.body);
            res.status(201).json(vaccine);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getVaccine: async (req, res) => {
        try {
            const vaccine = await Vaccine.findByPk(req.params.id);
            if (vaccine) {
                res.status(200).json(vaccine);
            } else {
                res.status(404).send('Vaccine not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = vaccineController;
