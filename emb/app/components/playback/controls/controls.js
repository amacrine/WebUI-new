define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    template: "/components/playback/controls/template",
    tagName: "div",
    className:"playback-controls",
    events: {
        "click .play": "play",
        "click .pause": "pause",
        "click .stop": "stop",
        "click .previous": "previous",
        "click .next": "next"
    },
    initialize: function() {
        this.socket = this.options.socket;
        this.playerStatus = this.options.playerStatus
        
        this.listenTo(this.playerStatus, "change:state", this.state);
//        this.listenTo(app.pubsub, "socket:connect", this.socketConnect);
    },
    play: function() {
        this.socket.emit('controls:play', {}, function (data) {
        });
    },
    pause: function() {
        this.socket.emit('controls:pause', {}, function (data) {
        });
    },
    stop: function() {
        this.socket.emit('controls:stop', {}, function (data) {
        });
    },
    previous: function() {
        this.socket.emit('controls:previous', {}, function (data) {
        });
    },
    next: function() {
        this.socket.emit('next', {}, function (data) {
        });
    },
    state: function() {
        console.log("state");
        this.render();
    },
    socketConnect: function() {
        console.log("socketConnect")
    },
    serialize: function() {
        return { playerStatus: this.playerStatus };
    },
  });

  module.exports = Layout;
});