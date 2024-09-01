const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/produtos', (req, res) => {
  const { nome, preco, descricao } = req.body;
  db.run("INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)", [nome, preco, descricao], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ id: this.lastID });
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao } = req.body;
  db.run("UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?", [nome, preco, descricao, id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ updated: this.changes });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM produtos WHERE id = ?", id, function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
