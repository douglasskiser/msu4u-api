
/**
var Audio = require('../audio/audio.model');
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');


exports.register = function(socket) {
    ss(socket).on('upload', function(stream, data) {

        var file = path.basename(data.name);
        var name = file.slice(0, file.length - 4);
        var fileName = file.slice(0, file.length - 4) + '_' + Date.now();
        var fileType = file.slice(file.length - 4, file.length);

        stream.pipe(fs.createWriteStream(path.join(__dirname, '/../../uploads/', fileName + fileType)));

        Audio.create({
            name: name,
            type: fileType,
            fileName: fileName + fileType,
            temp: false,
            active: false,
        }, function(err, clip) {
            if (err) {
                return socket.emit('upload:error', err);
            }

            return socket.emit('audio:update:one', clip);
        });

    });

    ss(socket).on('upload:wav', function(stream, data) {
        data.name = data.name + Date.now();

        stream.pipe(fs.createWriteStream(path.join(__dirname, '/../../uploads/', data.name + '.wav')));

        Audio.create({
            name: data.name,
            type: 'wav',
            fileName: data.name + '.wav',
            temp: false,
            active: false,
        }, function(err, clip) {
            if (err) {
                return socket.emit('upload:error', err);
            }

            return socket.emit('audio:update:one', clip);
        });
    });
};
**/
