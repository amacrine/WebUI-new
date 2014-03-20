define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  
  var Status = Backbone.Model.extend({
      initialize: function(attr, options) {
          
          if(typeof options.socket != "undefined") {
              this.socket = options.socket;
          }
          
          this.listenTo(app.pubsub, "socket:connect", this.socketConnect);
      },
      playerStatus: function() {
          var self = this;
          this.socket.emit('player:status', {}, function (data) {
              console.log(data);
              self.set(data);
          });
      },
      isPlaying: function() {
          return this.get('state') == 'play';
      },
      isStopped: function() {
          return this.get('state') == 'stop';
      },
      isPaused: function() {
          return this.get('state') == 'pause';
      },
      socketConnect: function() {
          this.playerStatus();
      }
  });
  
  module.exports = Status;
});