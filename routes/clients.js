
const express = require('express');
const router = express.Router();
const { Client } = require('../models');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: 'Token ausente' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido' });
  }
}

router.get('/', auth, async (req, res) => {
  const clients = await Client.findAll({ where: { UserId: req.userId } });
  res.json(clients);
});

router.post('/', auth, async (req, res) => {
  const client = await Client.create({ ...req.body, UserId: req.userId });
  res.json(client);
});

router.delete('/:id', auth, async (req, res) => {
  await Client.destroy({ where: { id: req.params.id, UserId: req.userId } });
  res.sendStatus(204);
});

router.put('/:id', auth, async (req, res) => {
  await Client.update(req.body, {
    where: { id: req.params.id, UserId: req.userId }
  });
  res.sendStatus(200);
});

module.exports = router;
        