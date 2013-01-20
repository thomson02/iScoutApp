define(
    ['jquery', 'backbone', 'underscore', 'text!templates/launchpad.html'],
    function($, Backbone, _, template) {

        var Launchpad = Backbone.View.extend({

            className: "launchpad-content",

            initialize: function(options) {
                _.bindAll(this);
                return this;
            },

            render: function() {
                console.log("Rendering the Launchpad page.");
                var html = _.template(template, {});
                this.$el.html(html);
                return this;
            }
        });

        return Launchpad;
    });
