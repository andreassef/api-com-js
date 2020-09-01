const HomeController = require('../controllers/homeController');
const homeController = new HomeController();

module.exports = (app) => {
    app.get('/', homeController.home());

    app.route(HomeController.rotas().login)
        .get(homeController.login())
        .post(homeController.efetuaLogin());
}