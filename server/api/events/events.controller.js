'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var Events = require('./events.model');

// Get list of Events
exports.index = function(req, res) {
    Events.find(function(err, evts) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, evts);
    });
};

exports.getImage = function(req, res) {
    var image = req.params.image;

    var filePath = path.join(__dirname, '/../../uploads/' + image);

    fs.exists(filePath, function(exists) {
        if (!exists) {
            return res.send(404);
        }

        res.setHeader('Content-Type', 'image/png');
        var stream = fs.createReadStream(filePath, {
            bufferSize: 64 * 1024
        });
        stream.pipe(res);
    });
};

exports.deleteImage = function(req, res) {
    var image = req.params.image;

    var filePath = path.join(__dirname, '/../../uploads/' + image);

    fs.exists(filePath, function(exists) {
        if (!exists) {
            return res.send(404);
        }

        fs.unlinkSync(filePath);

        Events.findById(req.params.id, function(err, evt) {
            if (err) {
                return res.send(500, err);
            }
            if (!evt) {
                return res.send(404);
            }

            evt.image = '';

            evt.save(function(err) {
                if (err) {
                    return res.send(500, err);
                }
                return res.send(200);
            });
        });
    });


};

exports.active = function(req, res) {
    Events.find({
        active: true
    }, function(err, evts) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, evts);
    });
};

// Creates a new event obj in the DB.
exports.create = function(req, res) {
    Events.create(req.body, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(200, evt);
    });
};

// Get a single event
exports.getOne = function(req, res) {
    Events.findById(req.params.id, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }
        if (!evt) {
            return res.send(404);
        }
        return res.json(evt);
    });
};

// Update a single event
exports.update = function(req, res) {
    Events.findById(req.params.id, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }
        if (!evt) {
            return res.send(404);
        }

        var updatedEvent = req.body;

        evt.name = updatedEvent.name;
        evt.description = updatedEvent.description;
        evt.date = updatedEvent.date;
        evt.time = updatedEvent.time;
        evt.location = updatedEvent.location;
        evt.active = updatedEvent.active;

        evt.save(function(err, thisEvent) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, thisEvent);
        });
    });
};

exports.activate = function(req, res) {
    Events.findById(req.params.id, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }
        if (!evt) {
            return res.send(404);
        }

        evt.active = true;

        evt.save(function(err) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200);
        });
    });
};

exports.deactivate = function(req, res) {
    Events.findById(req.params.id, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }
        if (!evt) {
            return res.send(404);
        }

        evt.active = false;

        evt.save(function(err) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200);
        });
    });
};

// Remove a single event
exports.remove = function(req, res) {

    Events.findById(req.params.id, function(err, evt) {
        if (err) {
            return res.send(500, err);
        }

        if (evt.image.length < 0) {
            var filePath = path.join(__dirname, '/../../uploads/' + evt.image);

            fs.exists(filePath, function(exists) {
                if (!exists) {
                    return res.send(404);
                }

                fs.unlinkSync(filePath);

                Events.findByIdAndRemove(req.params.id, function(err, evt) {
                    if (err) {
                        return res.send(500, err);
                    }
                    return res.send(204);
                });
            });
        }
        else {
            Events.findByIdAndRemove(req.params.id, function(err, evt) {
                    if (err) {
                        return res.send(500, err);
                    }
                    return res.send(204);
                });
        }


    });

};
