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
        resp.marko(require('../../views/books/form/form.marko'),{ livro: {} })
    });

    app.post('/livros', function(req, resp){
        console.log(req.body);
        const livrosDao = new LivrosDao(db);
        livrosDao.create(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp){
        console.log(req.body);
        const livrosDao = new LivrosDao(db);
        livrosDao.update(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.get('/livros/:id', function(req, resp){
        const id = req.params.id;
        const livrosDao = new LivrosDao(db);
        console.log(id);
        livrosDao.find(id).
        then(livro => 
            resp.marko(require('../../views/books/lists/lists.marko'),
            {
                livro: livro
            }
        ).catch( erro => console.log(erro)));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivrosDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form/:id', function(req, resp) {
         const id = req.params.id;
         const livroDao = new LivrosDao(db);
    
         livroDao.find(id)
             .then(livro => 
                 resp.marko(
                     require('../../views/books/form/form.marko'),
                     { livro: livro }
                 )
             )
             .catch(erro => console.log(erro));
    
    });

}
