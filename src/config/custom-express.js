const express = require('express');
const rotas = require('../app/routes/rotas');
require('marko/node-require').install();
require('marko/express');

const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded( { extended: true} ) );
rotas(app);
module.exports = app;