'use strict';

var Reflections = require('../reflections/reflections.model');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    socket.on('reflection:new', function(newReflection) {
    	socket.emit('reflection:new', newReflection);
    });

    socket.on('reflection:removed', function() {
        var data = {};

    	Reflections.find({temp: false}, function(err, reflections) {
    		if (!err) {
                data.reflections = reflections;

                Reflections.find({temp: true}, function(err, tempReflections) {
                    if (!err) {
                        data.temp = tempReflections;
                        socket.emit('reflection:update:all', data);
                    }
                });

    			
    		}
    	});
    });

    socket.on('reflection:updated', function() {
    	var data = {};

        Reflections.find({temp: false}, function(err, reflections) {
            if (!err) {
                data.reflections = reflections;

                Reflections.find({temp: true}, function(err, tempReflections) {
                    if (!err) {
                        data.temp = tempReflections;
                        socket.emit('reflection:update:all', data);
                    }
                });

                
            }
        });
    });
};
