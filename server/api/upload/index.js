'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();

router.post('/image', controller.image);

module.exports = router;