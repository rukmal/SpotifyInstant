
/*
 * GET home page.
 */

var Routes = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Welcome to Spotify Instant'
		});
	});
}

module.exports = Routes;