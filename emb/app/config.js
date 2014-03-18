// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    paths: {
        "vendor": "../vendor",
        "almond": "../vendor/bower/almond/almond",
        "jquery": "../vendor/bower/jquery/jquery",
        "underscore": "../vendor/bower/underscore/underscore",
        "backbone": "../vendor/bower/backbone/backbone",
        "layoutmanager": "../vendor/bower/layoutmanager/backbone.layoutmanager",
        "handlebars": "../vendor/bower/handlebars/handlebars",
        "spin": "../vendor/bower/spin.js/spin",
        "socketio" : "../vendor/bower/socket.io-client/dist/socket.io"
    },
    shim: {
        "handlebars": {
            exports: "Handlebars"
        },
        'socketio': {
            exports: 'io'
         },
    }
});
