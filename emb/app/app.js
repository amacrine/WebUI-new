define(function(require, exports, module) {
    "use strict";
    
    var $ = require("jquery");
    var Backbone = require("backbone");
    var Layout = require("layoutmanager");
    var Handlebars = require("handlebars");
        require("helpers");
    
    // Alias the module for easier identification.
    var app = module.exports;

    // The root path to run the application through.
    app.root = "/emb/app";
    

    // API endpoint.
    app.api = "";

    app.pubsub = _.extend({}, Backbone.Events);

    Backbone.Layout.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,
        prefix: app.root,
        fetchTemplate: function(path) {
            var done;
            var JST = window.JST || {};

            // Add the html extension.
            path = path + ".html";

            if (!JST[path]) {
                done = this.async();
                return $.ajax({
                    url: path
                }).then(function(contents) {
                    JST[path] = Handlebars.compile(contents);
                    JST[path].__compiled__ = true;
                    done(JST[path]);
                });
            }

            // If the template hasn't been compiled yet, then compile.
            if (!JST[path] && !JST[path].__compiled__) {
                JST[path] = Handlebars.template(JST[path]);
                JST[path].__compiled__ = true;
            }
            return JST[path];
        }
    });

    $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
        // Get the absolute anchor href.
        var href = {
            prop: $(this).prop("href"),
            attr: $(this).attr("href")
        };
        // Get the absolute root.
        var root = location.protocol + "//" + location.host + app.root;

        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and
            // will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);
        }
    });
});