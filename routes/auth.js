const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }

    res.json({ success: true, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;