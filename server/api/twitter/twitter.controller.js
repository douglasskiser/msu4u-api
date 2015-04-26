'use strict';

var twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'tl3veuP0TfQsePF4P79XE8dGp',
    consumer_secret: '1g8yeflmmgWqUMDzFHBIQKEotUQxk5m0c8SORLRzbrnN88UqKO',
    access_token_key: '216799719-xqmDLAX1JL9fbEmbugka4nF6SNA8Ujb2QkEqiA9P',
    access_token_secret: 'clpSVK5TTu6BSZ2lkr1CCumb7NzrM1OJUKXlfzplbJPjl'
});

exports.index = function(req, res) {
    twit.get('/statuses/user_timeline.json', {
        user_id: 216799719
    }, function(err, tweets, response) {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        console.log(tweets);
        return res.json(tweets);
    });
};
