const express = require('express');
const Client = require('../models/Client');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const clients = await Client.findAll({ where: { UserId: req.userId } });
  res.json(clients);
});

router.post('/', async (req, res) => {
  const { nome, email, telefone } = req.body;
  const client = await Client.create({ nome, email, telefone, UserId: req.userId });
  res.json(client);
});

module.exports = router;