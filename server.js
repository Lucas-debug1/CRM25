require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);

sequelize.sync().then(() => console.log("DB conectado e sincronizado."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
const { sequelize, User } = require('./models');

// Após sync
sequelize.sync().then(async () => {
  console.log("DB sincronizado.");

  // Cria admin se não existir
  const admin = await User.findOne({ where: { username: 'admin' } });
  if (!admin) {
    await User.create({ username: 'admin', password: '1234' });
    console.log("Usuário admin criado.");
  }
});
