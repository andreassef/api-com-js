const db = require('../../config/database') 
const LivrosDao = require('../dao/livrosDao')

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código HELLOOO </h1>
                    </body> 
                </html>
            `
        );
    });

    app.get('/livros', function(req, resp) {
        const livrosDao = new LivrosDao(db);
        livrosDao.index().then(livros => 
            resp.marko(
                require('../../views/books/lists/lists.marko'),
                {
                    livros: livros
                }
            ).catch(erro => console.log(erro)));
    });

    app.get('/livros/form', function(req, resp){
        resp.marko(require('../../views/books/form/form.marko'))
    });

    app.post('/livros', function(req, resp){
        console.log(req.body);
        const livrosDao = new LivrosDao(db);
        livrosDao.create(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

}
