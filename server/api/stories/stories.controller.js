'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var Stories = require('./stories.model');

// Get list of Stories
exports.index = function(req, res) {
    Stories.find({temp: false}, function(err, refs) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, refs);
    });
};

exports.temp = function(req, res) {
    Stories.find({
        temp: true
    }, function(err, refs) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, refs);
    });
};

exports.removeFromTemp = function(req, res) {
    Stories.findById(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        ref.temp = false;
        ref.save(function(error) {
            if (error) {
                return res.send(500, error);
            }
            return res.send(200);

        });
    });
};

exports.active = function(req, res) {
    Stories.find({
        active: true
    }, function(err, refs) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, refs);
    });
};

// Creates a new event obj in the DB.
exports.create = function(req, res) {
    Stories.create(req.body, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, ref);
    });
};

// Get a single reflection
exports.getOne = function(req, res) {
    Stories.findById(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        if (!ref) {
            return res.send(404);
        }
        return res.json(ref);
    });
};

// Update a single event
exports.update = function(req, res) {
    Stories.findById(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        if (!ref) {
            return res.send(404);
        }

        var updatedRef = req.body;

        ref.name = updatedRef.name;
        ref.content = updatedRef.content;
        ref.date = updatedRef.date;
        ref.active = updatedRef.active;

        ref.save(function(err, thisRef) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, thisRef);
        });
    });
};

exports.activate = function(req, res) {
    Stories.findById(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        if (!ref) {
            return res.send(404);
        }

        ref.active = true;

        ref.save(function(err) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200);
        });
    });
};

exports.deactivate = function(req, res) {
    Stories.findById(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        if (!ref) {
            return res.send(404);
        }

        ref.active = false;

        ref.save(function(err) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200);
        });
    });
};

// Remove a single event
exports.remove = function(req, res) {
    Stories.findByIdAndRemove(req.params.id, function(err, ref) {
        if (err) {
            return res.send(500, err);
        }
        return res.send(204);
    });
};
