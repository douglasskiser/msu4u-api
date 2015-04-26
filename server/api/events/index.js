var express = require('express');
var controller = require('./events.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/active', controller.active);
router.get('/:id', controller.getOne);
router.get('/:id/:image', controller.getImage);
router.delete('/:id/:image', controller.deleteImage);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/activate', controller.activate);
router.put('/:id/deactivate', controller.deactivate);
router.delete('/:id', controller.remove);

module.exports = router;