'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventsSchema = new Schema({
    name: String,
    description: String,
    date: {
    	type: Date,
    	default: Date.now
    },
    time: String,
    location: String,
    active: {
    	type: Boolean,
    	default: false
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Events', EventsSchema);
