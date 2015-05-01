/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/setup', require('./api/setup'));
  app.use('/api/events', require('./api/events'));
  app.use('/api/stories', require('./api/stories'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/upload', require('./api/upload'));
  app.use('/api/facebook', require('./api/facebook'));
  app.use('/api/twitter', require('./api/twitter'));
  app.use('/api/reset', require('./api/reset'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
