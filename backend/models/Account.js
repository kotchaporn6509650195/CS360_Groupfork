const { Model, DataTypes } = require('sequelize');
const sequelize = require('../mockConfig/database'); // Make sure this path points to your Sequelize instance

class Account extends Model {}

Account.init({
    // Define the attributes of the Account model
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure usernames are unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email addresses are unique
        validate: {
            isEmail: true, // Validate that the email is in the correct format
        },
    },
}, {
    sequelize, // This is the missing piece - you need to pass the sequelize instance
    modelName: 'Account',
    tableName: 'accounts', // Name of the table in the database
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
});

module.exports = Account;
