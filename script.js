
let token = '';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    token = data.token;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    carregarClientes();
  } else {
    alert('Login inválido');
  }
}

async function register() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Usuário cadastrado com sucesso! Agora você pode fazer login.');
  } else {
    alert('Erro ao cadastrar usuário (talvez já exista).');
  }
}

async function carregarClientes() {
  const res = await fetch('/api/clients', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const clientes = await res.json();
  const lista = document.getElementById('lista-clientes');
  lista.innerHTML = '';
  clientes.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `${c.nome} - ${c.email} - ${c.telefone}
      <button onclick="excluir(${c.id})">Excluir</button>`;
    lista.appendChild(li);
  });
}

async function addClient() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  await fetch('/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nome, email, telefone })
  });
  carregarClientes();
}

async function excluir(id) {
  await fetch(`/api/clients/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  carregarClientes();
}
