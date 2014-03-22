var io = require('socket.io')
    .listen(8080);

var mpd = require('mpd'); 
var cmd = mpd.cmd;

//var spotify = require('./node_modules/node-spotify/build/Release/spotify')( {
//    appkeyFile: '/var/www/emb/server/spotify_appkey.key',
//});
//
//var playlists;
//var playlistContainer;

//spotify.ready( function() {
//    console.log("spo ready");
//    playlistContainer = spotify.playlistContainer;
//    playlists = playlistContainer.getPlaylists();
//    console.log(playlists);
//    var track = spotify.createFromLink('spotify:track:5T2Cft0v1qKSmH0GUDzB2b');
////    var track = playlist.getTracks()[0];
//    spotify.player.play(track);
//});
//
//spotify.login('dg.kaba', '****', true, false);

var MpdManager = require('./lib/MpdManager');
var MpdMgr = new MpdManager();

var mpdCli = mpd.connect({
    port: 6600,
    host: 'localhost',
});

mpdCli.on('ready', function() {
    MpdMgr.setMpdClient(mpdCli);
    MpdMgr.setSocketIO(io);
});

mpdCli.on('system', function(name) {
    console.log("system: " + name)
});
mpdCli.on('system-player', function() {
    console.log("player")
});
mpdCli.on('system-playlist', function() {
    console.log("playlist")
});

io.sockets.on('connection', function(socket) {
    
    socket.on('player:status', function(params, fun) {
        mpdCli.sendCommand(cmd("status", []), function(err, msg) {
            if (err) throw err;
            fun(MpdMgr.MsgToJson(msg));
        });
    });
    
    socket.on('controls:play', function(params) {
        mpdCli.sendCommand(cmd("play", []), function(err, msg) {
            if (err) throw err;
            console.log("play");
            console.log(msg);
        });
    });
    
    socket.on('controls:pause', function(params) {
        mpdCli.sendCommand(cmd("pause", []), function(err, msg) {
            if (err) throw err;
            console.log(msg);
        });
    });
    
    socket.on('controls:stop', function(params) {
        mpdCli.sendCommand(cmd("stop", []), function(err, msg) {
            if (err) throw err;
            console.log("stop");
            console.log(msg);
        });
    });
    
    socket.on('controls:previous', function(params) {
        mpdCli.sendCommand(cmd("previous", []));
    });
    
    socket.on('controls:next', function(params) {
        mpdCli.sendCommand(cmd("next", []));
    });
    
});