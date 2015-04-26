'use strict';

var Events = require('../events/events.model');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    socket.on('event:new', function(newEvent) {
    	socket.emit('event:new', newEvent);
    });

    socket.on('event:removed', function() {
    	Events.find(function(err, events) {
    		if (!err) {
    			socket.emit('event:removed', events);
    		}
    	});
    });

    socket.on('event:update', function() {
    	Events.find(function(err, events) {
    		if (!err) {
    			socket.emit('event:update', events);
    		}
    	});
    });
};
