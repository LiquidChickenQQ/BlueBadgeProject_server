module.exports = function (sequelize, DataTypes) {
    return sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: true
        },
        results: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner_properties: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        thawing: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marinade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cooling: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ph_test: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })
}

// for adding columns and data

// server - log.js
//         -log-controller
// client  -workoutCreate
//         -workoutEdit
//         -workoutTable