const {check} = require('express-validator/check');
const BookController = require('../controllers/bookController');
const { routes } = require('../controllers/bookController');
const Book = require('../model/bookEntity');
const bookController = new BookController();
const routesBooks = BookController.routes();

module.exports = (app) => {

    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> TELA DE TESTE </h1>
                    </body> 
                </html>
            `
        );
    });

    app.get(routesBooks.lista, bookController.index());

    app.get('/livros/form', function(req, resp){
        resp.marko(require('../../views/books/form/form.marko'),{ livro: {} })
    });

    //app.route(routesBooks.cadastro).get(bookController)


    app.post(routesBooks.cadastro, Book.validations(), bookController.create());

    app.put(routesBooks.cadastro, bookController.update());

    app.get(routesBooks.cadastro, bookController.findById());

    app.delete(routesBooks.delecao, bookController.delete());

    app.get(routesBooks.edicao,bookController.findForm());

}
