const express = require('express');
const router = express.Router();
const { Client } = require('../models');

router.post('/', async (req, res) => {
  try {
    const cliente = await Client.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const clientes = await Client.findAll({ order: [['createdAt', 'DESC']] });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, valorConta, arquivo, userId } = req.body;

    if (!userId) return res.status(400).json({ error: "ID do usuário obrigatório" });

    const cliente = await Client.create({ nome, email, telefone, valorConta, arquivo, UserId: userId });
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
