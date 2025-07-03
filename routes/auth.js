const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});

module.exports = router;
