const HomeModel = require('../modules/HomeModel');

HomeModel.create({
  titulo:"Batman 98",
  descricao:"Just a regular movie"
})
.then(dados => console.log(dados))
.catch(e => console.log(e))

exports.paginaInicial = (req, res) => {
  res.render('index',{
    titulo: 'Titulo da página',
    numeros:[0,1,3]
  });
  return;
};


exports.trataPost = (req, res) => {
    res.send(req.body)
    return;
  };