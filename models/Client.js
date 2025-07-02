const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  valorConta: DataTypes.STRING,
  arquivo: DataTypes.JSON // nome, tipo, base64
});

module.exports = Client;
// Sincroniza o modelo com o banco de dados