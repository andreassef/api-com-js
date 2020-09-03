const BookController = require('./bookController');
const passport = require('passport');

class HomeController {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        };
    }

    home() {
        return function (req, resp) {
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
        };
    }

    login() {
        return function(req, resp) {
            resp.marko( require('../../views/base/login.marko')  )
        }
    }

    efetuaLogin() {
        return function(req, resp, next) {
            //const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => {
                if(info){
                    return resp.marko(require('../../views/base/login.marko'));
                }
                if(erro){
                    return next(erro);
                }
                req.login(usuario, (erro) => {
                    if(erro) {
                        return next(erro);
                    }
                    return resp.redirect(BookController.routes().lista);
                });
            }) (req, resp, next);
        };
    }
}

module.exports = HomeController;