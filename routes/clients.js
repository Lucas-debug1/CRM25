const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const nodemailer = require('nodemailer');

// Rota para salvar cliente e enviar email
router.post('/', async (req, res) => {
  const { nome, email, telefone, valorConta, arquivo } = req.body;

  if (!nome || !email || !telefone || !valorConta || !arquivo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Salva no banco
    const cliente = await Client.create({ nome, email, telefone, valorConta, arquivo });

    // Configura o transporte de email via Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Seu Gmail
        pass: process.env.EMAIL_PASS  // Senha de app
      }
    });

    // Conteúdo do email
    const mailOptions = {
      from: `"CRM 2004" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // Para onde enviar
      subject: 'Novo Cliente Cadastrado',
      html: `
        <h2>Novo Cliente Cadastrado</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Valor da Conta:</strong> R$ ${valorConta}</p>
        <p><strong>Anexo:</strong> ${arquivo.nome}</p>
      `
    };

    // Envia o email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Cliente salvo e email enviado com sucesso.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar cliente ou enviar email.' });
  }
});

module.exports = router;
