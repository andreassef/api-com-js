require('marko/node-require').install(); // utilizamos o marko para visualizarmos os dados na tela dinamicamente
require('marko/express'); // para que seja possível utilizar o marko com o resquest e response

const express = require('express'); // importamos o modulo express, que facilitará fazermos requisições http
const app = express();
const bodyParser = require('body-parser'); // middleware que lida com req.boy, informções vindas de um input do usuário.
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded( { extended: true} ) );
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

const rotas = require('../app/routes/rotas'); // informamos o path do nosso modulo de rotas
rotas(app);

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);


app.use(function(req, resp, next) {
  return resp.status(404).marko(
    require('../views/books/erros/404.marko')
  );
}); 

app.use(function (erro, req, resp, next) {
  return resp.status(500).marko(
      require('../views/books/erros/500.marko')
  );

});

module.exports = app;