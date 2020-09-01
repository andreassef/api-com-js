const bookRoutes = require('./booksRoutes');
const homeRoutes = require('./homeRoutes');

module.exports = (app) => {
    bookRoutes(app);
    homeRoutes(app);
}
