const HomeModel = require('../modules/HomeModel');

HomeModel.create({
  titulo:"Batman 98",
  descricao:"Just a regular movie"
})
.then(dados => console.log(dados))
.catch(e => console.log(e))

exports.paginaInicial = (req, res) => {
    res.render('index');
  };
  
  exports.trataPost = (req, res) => {
    res.send(req.body)
    return;
  };