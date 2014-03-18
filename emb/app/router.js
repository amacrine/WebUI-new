define(function(require, exports, module) {
    "use strict";
    
    var app = require("app");
    var io = require("socketio");

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        initialize: function() {
            var self = this;
            
            this.socket = io.connect('http://volumio.local:8080');
            
            this.socket.on('connect', function (data) {
                console.log("connect");
            });
            
            var Layout = Backbone.Layout.extend({
                el: "main",
                template: "/app/templates/index",
                views: {}
              });
            
            this.layout = new Layout();
        },
        routes: {
            "": "indexIndex",
        },
        indexIndex: function () {
            var self = this;
            
            this.layout.render().promise().done(function(){
                console.log("ok done");
                $(".play").click(function(){
                    self.socket.emit('play', {}, function (data) {
                       console.log(data); // data will be 'woot'
                    });
                });
                $(".stop").click(function(){
                    self.socket.emit('stop', {}, function (data) {
                        console.log(data); // data will be 'woot'
                     });
                });
            });
        }
    });

    module.exports = Router;
});