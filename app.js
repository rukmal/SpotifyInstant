
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
	res.render('index', {
		title: 'Spotify Instant'
	});
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var lame = require('lame');
var speaker = require('speaker');
var Spotify = require('spotify-web');

io.sockets.on('connection', function (socket) {
	socket.on('login-credentials', function (loginInfo) {
		Spotify.login(loginInfo.username, loginInfo.password, function (err, spotify) {
			socket.on('song-info', function (songInfo) {
				spotify.get(songInfo, function (err, track) {
					if (err) {
						console.log(err);
					}
					console.log(track.play());
				});
			});
		});
	});
});