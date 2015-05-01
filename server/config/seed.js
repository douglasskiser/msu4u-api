/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Events = require('../api/events/events.model');
var User = require('../api/user/user.model');
var Stories = require('../api/stories/stories.model');
var rimraf = require('rimraf');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

Events.find({}).remove(function() {
    Events.create({
        name: 'Test Event',
        description: 'Test Description About Event',
        date: Date.now(),
        time: 'Noon - 1',
        location: 'Somewhere',
        active: false,
        image: 'coffee.png'
    }, function() {
        console.log('finished populating events');
    });
});

Stories.find({}).remove(function() {
    Stories.create({
        name: 'Test Reflection',
        content: 'Test Content About Reflection',
        date: Date.now(),
        active: true,
        temp: false
    }, {
        name: 'Another Test Reflection',
        content: 'Test Content About Reflection',
        date: Date.now(),
        active: false,
        temp: true
    }, function() {
        console.log('finished populating reflections');
    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
        console.log('finished populating users');
    });
});

