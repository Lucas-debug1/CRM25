const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Client = sequelize.define('Client', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING
});

User.hasMany(Client);
Client.belongsTo(User);

module.exports = Client;