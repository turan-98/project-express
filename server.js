require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const middleware = require('./src/middlewares/middleware');
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIOSTRING)
.then(() => {
  //retorna um sinal de quando conectou 
  app.emit('done');
})

app.use(middleware)
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

//vai conectar somente quando tiver o retorno do mongoose
app.on('done', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})


