// models/vaccination.js
module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define('Vaccination', {
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
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        administeredBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Vaccination.associate = function (models) {
        Vaccination.belongsTo(models.Sheep, { foreignKey: 'sheepId' });
    };

    return Vaccination;
};
