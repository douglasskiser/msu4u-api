'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReflectionsSchema = new Schema({
    name: String,
    content: String,
    date: {
    	type: Date,
    	default: Date.now
    },
    active: {
    	type: Boolean,
    	default: false
    },
    temp: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Reflections', ReflectionsSchema);
