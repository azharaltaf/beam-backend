const express = require('express'),
    router = express.Router(),
    compileSass = require('express-compile-sass'),
    root = process.cwd(),
    searchController = require('./controllers/SearchController');

router.post('/api/v1/vehicle/search', searchController.search)

module.exports.router = router;