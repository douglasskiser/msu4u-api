'use strict';

var Stories = require('../stories/stories.model');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    socket.on('story:new', function(newStory) {
    	socket.emit('story:new', newStory);
    });

    socket.on('story:removed', function() {
        var data = {};

    	Stories.find({temp: false}, function(err, stories) {
    		if (!err) {
                data.stories = stories;

                Stories.find({temp: true}, function(err, tempStories) {
                    if (!err) {
                        data.temp = tempStories;
                        socket.emit('story:update:all', data);
                    }
                });

    			
    		}
    	});
    });

    socket.on('story:updated', function() {
    	var data = {};

        Stories.find({temp: false}, function(err, stories) {
            if (!err) {
                data.stories = stories;

                Stories.find({temp: true}, function(err, tempStories) {
                    if (!err) {
                        data.temp = tempStories;
                        socket.emit('story:update:all', data);
                    }
                });

                
            }
        });
    });
};
