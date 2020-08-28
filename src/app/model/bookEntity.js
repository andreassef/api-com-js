const { check } = require('express-validator/check');

class Book {
    static validations() {
        return [
            check('titulo').isLength({min: 5}).withMessage('The title needs at least 5 characters!'),
            check('preco').isCurrency().withMessage('The price needs be monetary!')
        ];
    }
}

module.exports = Book;