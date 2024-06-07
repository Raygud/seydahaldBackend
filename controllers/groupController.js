// controllers/groupController.js
const db = require('../models');
const Group = db.Group;

const groupController = {
    createGroup: async (req, res) => {
        try {
            const group = await Group.create(req.body);
            res.status(201).json(group);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getGroup: async (req, res) => {
        try {
            const group = await Group.findByPk(req.params.id);
            if (group) {
                res.status(200).json(group);
            } else {
                res.status(404).send('Group not found');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getGroupByUserId: async (req, res) => {
        try {
            const groups = await Group.findAll({
                where: {
                    userId: req.params.userId
                }
            });
            if (groups && groups.length > 0) {
                res.status(200).json(groups);
            } else {
                res.status(404).send('No groups found for the given userId');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

};

module.exports = groupController;
