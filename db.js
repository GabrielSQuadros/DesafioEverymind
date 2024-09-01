const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Produtos-NunesSports.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, preco REAL, descricao TEXT)");
});

module.exports = db;
