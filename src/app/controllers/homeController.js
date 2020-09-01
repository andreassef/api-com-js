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
        }
    }

    login() {
        return function(req, resp) {
            resp.marko( require('../../views/base/login.marko')  )
        }
    }

    efetuaLogin() {
        return function(req, resp) {
            
        }
    }
}

module.exports = HomeController;