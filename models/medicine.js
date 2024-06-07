// models/medicine.js
module.exports = (sequelize, DataTypes) => {
    const Medicine = sequelize.define('Medicine', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateAdministered: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        administeredBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Medicine.associate = function (models) {
        Medicine.belongsTo(models.Sheep, { foreignKey: 'sheepId' });
    };

    return Medicine;
};
