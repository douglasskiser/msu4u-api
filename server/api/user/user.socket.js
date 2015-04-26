'use strict';

var User = require('../user/user.model');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    socket.on('user:new', function(newUser) {
    	socket.emit('user:new', newUser);
    });

    socket.on('user:removed', function() {
    	User.find(function(err, users) {
    		if (!err) {
    			socket.emit('user:update', users);
    		}
    	});
    });

    socket.on('user:update', function() {
    	User.find(function(err, users) {
    		if (!err) {
    			socket.emit('user:update', users);
    		}
    	});
    });
};
