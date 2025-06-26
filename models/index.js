
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'crm.db'
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
});

const Client = sequelize.define('Client', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING
});

User.hasMany(Client);
Client.belongsTo(User);

module.exports = { sequelize, User, Client };
        