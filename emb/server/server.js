var mpd = require('mpd'); 
var cmd = mpd.cmd;

var io = require('socket.io')
    .listen(8080);

var mpdcli = mpd.connect({
    port: 6600,
    host: 'localhost',
});

mpdcli.on('ready', function() {
    console.log("MPD ready");
});

mpdcli.on('system', function(name) {
    console.log("update", name);
});

mpdcli.on('system-player', function() {
    mpdcli.sendCommand(cmd("status", []), function(err, msg) {
        if (err) throw err;
        console.log(msg);
    });
});

io.sockets.on('connection', function(socket) {

    socket.on('play', function(params) {
        mpdcli.sendCommand(cmd("play", []));
    });

    socket.on('stop', function(params) {
        mpdcli.sendCommand(cmd("stop", []));
    });
    
});