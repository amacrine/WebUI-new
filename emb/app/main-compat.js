define("kickstart", function(require) {
    var app = require("app");
    var Router = require("router-compat");
    
    app.router = new Router();
    
    Backbone.history.start({ pushState: true, root: app.root });
});

require(["config"], function() {
    require(["kickstart"]);
});