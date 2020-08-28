const db = require('../../config/database');
const LivrosDao = require('../dao/livrosDao');
const { validationResult } = require('express-validator/check');
class BookController {
    static routes() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            buscaPorId: '/livros/:id',
            delecao: '/livros/:id'
        }
    }

    index() {
        return function(req, resp) {
            const livrosDao = new LivrosDao(db);
            livrosDao.index()
            .then(livros => 
                resp.marko(
                    require('../../views/books/lists/lists.marko'),
                    {
                        livros
                    }
                ).catch(erro => console.log(erro)));
        }
    }

    create() {
        return function(req, resp){
            console.log(req.body);
            const livrosDao = new LivrosDao(db);
            
            const erros = validationResult(req);
    
            if(!erros.isEmpty()) {
                return resp.marko(
                    require('../../views/books/form/form.marko'),
                    { livro: req.body,
                      errosValidacao: erros.array()  
                    }
                );
            }
    
            livrosDao.create(req.body)
            .then(resp.redirect(BookController.routes().lista))
            .catch(erro => console.log(erro));
        }
    }

    update() {
        return function(req, resp){
            console.log(req.body);
            const livrosDao = new LivrosDao(db);
            livrosDao.update(req.body)
            .then(resp.redirect(BookController.routes().lista))
            .catch(erro => console.log(erro));
        }
    }

    findById() {
        return function(req, resp){
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
        }
    }

    delete() {
        return function(req, resp) {
            const id = req.params.id;
        
            const livroDao = new LivrosDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }

    findForm() {
        return function(req, resp) {
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
       }
    }
}

module.exports = BookController;