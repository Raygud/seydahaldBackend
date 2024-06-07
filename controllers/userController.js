// controllers/userController.js
const db = require('../models');
const User = db.User;
const Group = db.Group;
const Sheep = db.Sheep;
const Medicine = db.Medicine;
const Vaccination = db.Vaccination;

const userController = {
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: Group,
                    include: [{
                        model: Sheep,
                        include: [
                            { model: Medicine },
                            { model: Vaccination }
                        ]
                    }]
                }]
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = userController;
