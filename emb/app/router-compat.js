define(function(require, exports, module) {
    "use strict";
    
    var app = require("app");
    var io = require("socketio");
    
    var Playback = require("components/playback/index");
    var Player = require("components/player/index");
    
    var Router = Backbone.Router.extend({
        
        initialize: function() {
            
            var self = this;
            
            this.socketConnectDfd = $.Deferred();
            this.socket = io.connect('http://volumio.local:8080');
            
            this.socket.on('connect', function (data) {
                self.socketConnectDfd.resolve();
                app.pubsub.trigger("socket:connect");
            });
            
            this.playerStatus = new Player.Status({}, {
                socket: this.socket
            });
            
            this.playbackControl = new Playback.Views.Controls({
                socket: this.socket,
                playerStatus: this.playerStatus
            });
        },
        routes: {
            "": "indexIndex",
        },
        indexIndex: function () {
            var self = this;
            
            this.socketConnectDfd.done(function() {
                console.log("connect");
            });
            
            this.playbackControl.render()
                .$el.insertAfter("#menu-dropdown");
            
//            var Layout = Backbone.Layout.extend({
//                el: "main",
//                template: "/app/templates/index",
//                views: {}
//              });
//            
//            this.layout = new Layout();
//            
//            this.layout.render().promise().done(function(){
//                console.log("ok done");
//                $(".play").click(function(){
//                    self.socket.emit('play', {}, function (data) {
//                       console.log(data); // data will be 'woot'
//                    });
//                });
//                $(".stop").click(function(){
//                    self.socket.emit('stop', {}, function (data) {
//                        console.log(data); // data will be 'woot'
//                     });
//                });
//            });
        }
    });

    module.exports = Router;
});