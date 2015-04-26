'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'msuhealthservices@gmail.com',
        pass: 'AIzaSyAh-_NeQswyfqHXfx5dU96rEKtRNLjtahI'
    }
});


var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'admin';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        res.json(user);
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Send user a reset password link to their email
 */
exports.forgotPassword = function(req, res) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (!user) return res.status(500).send('This email is not registered.');

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; //1hr

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            // email reset url
            //console.log('http://' + req.headers.host + '/api/reset/' + token);

            transporter.sendMail({
                from: 'msuhealthservices@gmail.com',
                to: req.body.email,
                subject: 'Password Reset',
                text: 'Follow this link to reset your password. http://' + req.headers.host + '/api/reset/' + token + ' If you did not request this link, please disreguard.'
            });

            return res.send(200);
        }
    ], function(err) {
        if (err) return res.send(500);
        return res.send(200);
    });
};
/**
 * Reset Password
 */
exports.reset = function(req, res) {
    User.findOne({
        resetPasswordToken: req.body.token
    }, function(err, user) {
        if (err) {
            return res.send(500);
        }
        if (user.resetPasswordExpires <= Date.now()) {
            return res.send(500);
        }

        user.password = req.body.password;
        user.save(function(err) {
            if (err) {
                return res.send(500);
            }
            return res.send(200);
        });
    });
};

/**
 * Update a users account information
 */
exports.updateAccount = function(req, res, next) {
    var userId = req.user._id;
    var name = String(req.body.name);
    var email = String(req.body.email);

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        user.name = name;
        user.email = email;
        user.save(function(err) {
            if (err) return next(err);
            res.send(200, user);
        })
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
