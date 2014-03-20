var mpd = require('mpd'); 
var cmd = mpd.cmd;

module.exports = MpdManager;

function MpdManager() {
    this.socketIO;
    this.mpdClient;
};

MpdManager.prototype.setMpdClient = function(mpdClient) {
    this.mpdClient = mpdClient;
    return this;
};

MpdManager.prototype.setSocketIO = function(socket) {
    this.socketIO = socket;
    return this;
};

MpdManager.prototype.MsgToJson = function(msg) {
    var msgObj = {};
    msg.split("\n").forEach(function(line) {
        var arr = line.split(":");
        if(arr.length == 2) {
            msgObj[arr[0]] = arr[1].trim();
        }
    });
    return msgObj;
};