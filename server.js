require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const middleware = require('./src/middlewares/middleware');
const verifyCsrf = require('./src/middlewares/middleware');
const verifyToken = require('./src/middlewares/middleware');
const csrfMiddleWare = require('./src/middlewares/middleware');
const csrf = require('csurf');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIOSTRING)
.then(() => {
  //retorna um sinal de quando conectou 
  app.emit('done');
})

app.use(helmet())

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const session = require('express-session');
const mongoStore = require('connect-mongo')
const flashMsg = require('connect-flash');


app.use(
  session({
    secret:'JJrVbr4ctEkO9h4',
    store: mongoStore.create({mongoUrl: process.env.CONNECTIOSTRING}),
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:1000 * 60 * 60 * 24 * 3,
      httpOnly:true
    }
  })
);

app.use(flashMsg());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf())
app.use(function(req,res,next){
  res.locals.csrfToken = req.csrfToken();
  next();
})
app.use(middleware)
app.use(verifyCsrf)
app.use(verifyToken)


app.use(routes);

//vai conectar somente quando tiver o retorno do mongoose
app.on('done', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})




