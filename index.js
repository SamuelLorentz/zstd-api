const express = require('express');
const fs = require('fs');
const  zstd = require('@mongodb-js/zstd');

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/zstd', async (req, res) => {
  try {
    const data = fs.readFileSync('content.html');
    const compressedData = await zstd.compress(data, 5);

    res.setHeader('Content-Encoding', 'zstd');
    res.setHeader('Content-Type', 'text/plain');
    res.send(compressedData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao ler ou comprimir o arquivo');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;