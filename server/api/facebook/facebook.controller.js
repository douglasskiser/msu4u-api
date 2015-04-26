
var request = require('request-json');

var facebookAPI = request.createClient('https://graph.facebook.com/v2.2/311911782346527/feed?access_token=1549571105313567|b8db84b569fc8957292241ee3a8d1fc7');

// Get facebook feed
exports.index = function(req, res) {
facebookAPI.get('', function(err, response, body) {
		if (err) {
			  return res.send(500);
		}
    return res.json(body.data);
	});
};
