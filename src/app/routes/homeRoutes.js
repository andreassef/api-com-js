const HomeController = require('../controllers/homeController');
const homeController = new HomeController();

module.exports = (app) => {
    const rotasBase = HomeController.rotas();

    app.get('/', homeController.home());

    app.get(rotasBase.login, homeController.login());
    app.post(rotasBase.login, homeController.efetuaLogin());   
}