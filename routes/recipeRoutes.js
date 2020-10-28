const express = require('express');

const routes = express.Router();

routes.post('/recipes', () => console.log('Recipes'));

module.exports = routes;
