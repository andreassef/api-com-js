const BookController = require('../controllers/bookController');
const Book = require('../model/bookEntity');
const bookController = new BookController();
const routesBooks = BookController.routes();

module.exports = (app) => {

    // Lista todos os livros
    app.get(routesBooks.lista, bookController.index());

    app.get(routesBooks.cadastro, function(req, resp){
        resp.marko(require('../../views/books/form/form.marko'),{ livro: {} })
    }); 
    // create a new registry
    app.post(routesBooks.cadastro, Book.validations(), bookController.create());
    // edit a registry
    app.put(routesBooks.cadastro, bookController.edit());
    // procura por um formulario especifico para edição
    app.get(routesBooks.edicao, bookController.findForm());
    // deleta um registro
    app.delete(routesBooks.delecao, bookController.delete());
    
    
}
//app.route(routesBooks.cadastro).get(bookController)