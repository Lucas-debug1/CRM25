
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
});

const Client = sequelize.define('Client', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  valorConta: DataTypes.STRING,
  arquivoNome: DataTypes.STRING,
  arquivoBase64: DataTypes.TEXT
});

User.hasMany(Client);
Client.belongsTo(User);

module.exports = { sequelize, User, Client };

        