var express = require('express');
var controller = require('./reflections.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/active', controller.active);
router.get('/temp', controller.temp);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.put('/:id/removeFromTemp', controller.removeFromTemp);
router.put('/:id/activate', controller.activate);
router.put('/:id/deactivate', controller.deactivate);
router.delete('/:id', controller.remove);

module.exports = router;