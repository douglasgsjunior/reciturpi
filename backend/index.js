const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'br9ikcswbolcedzmeuqh-mysql.services.clever-cloud.com',
  user: 'unvmntl84scgjbzu',
  password: '8x7QKwIIdwz7DkVTGZB8',
  database: 'br9ikcswbolcedzmeuqh'
});

// Rota para buscar os dados no banco de dados
app.get('/dados', (req, res) => {
  connection.query('SELECT guide_name, guide_photo, guide_description, guide_location, guide_whatsapp_number FROM guide_tbl', (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro ao consultar o banco de dados');
      return;
    }
    res.json(results);
  });
});

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
