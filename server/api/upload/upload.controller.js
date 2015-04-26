var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    Events = require('../events/events.model');

/**
exports.index = function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var fileSize = files.file.size,
            fileExt = files.file.name.split('.').pop(),
            fileName = files.file.name,
            oldPath = files.file.path,
            newPath = path.join(__dirname, '/../../uploads/', fileName);

        fs.readFile(oldPath, function(err, data) {
            fs.writeFile(newPath, data, function() {
                Audio.create({
                    name: fileName,
                    type: fileExt,
                    fileName: fileName,
                    temp: false,
                    active: false
                }, function(err) {
                    return res.send(200);

                });
            });
        });
    });

};

exports.recording = function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {
        var audio = JSON.parse(fields.audio);

        var file = {};

        var fileName = 'recording' + Date.now();
        var fileExt = 'wav';
        var newPath = path.join(__dirname, '/../../uploads/', fileName + '.' + fileExt);
        var fileBuffer;

        file.contents = audio.contents.split(',').pop();

        fileBuffer = new Buffer(file.contents, 'base64');

        fs.writeFile(newPath, fileBuffer, function() {
            Audio.create({
                name: fileName,
                type: fileExt,
                fileName: fileName + '.' + fileExt,
                temp: false,
                active: false
            }, function(err) {
                return res.send(200);

            });
        });
    });
};
**/
exports.image = function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var fileSize = files.file.size,
            fileExt = files.file.name.split('.').pop(),
            fileName = files.file.name,
            oldPath = files.file.path,
            newPath = path.join(__dirname, '/../../uploads/', fileName),
            eventId = fields.eventId;

        fs.readFile(oldPath, function(err, data) {
            fs.writeFile(newPath, data, function() {
                Events.findById(eventId, function(err, evt) {
                    if (err) {
                        return res.send(500, err);
                    }
                    if (!evt) {
                        return res.send(404);
                    }

                    evt.image = fileName;
                    evt.save(function(err, updateEvt) {
                        if (err) {
                            return res.send(500, err);
                        }
                        return res.send(200);
                    });
                });
            });
        });
    });
};
