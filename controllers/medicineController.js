// controllers/medicineController.js
const db = require('../models');
const Medicine = db.Medicine;

const medicineController = {
    createMedicine: async (req, res) => {
        try {
            const medicine = await Medicine.create(req.body);
            res.status(201).json(medicine);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getMedicine: async (req, res) => {
        try {
            const medicine = await Medicine.findByPk(req.params.id);
            if (medicine) {
                res.status(200).json(medicine);
            } else {
                res.status(404).send('Medicine not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = medicineController;
