define(
    ['jquery', 'backbone', 'underscore', 'text!modules/launchpad/launchpad.html'],
    function($, Backbone, _, template) {

        var Launchpad = Backbone.View.extend({

            className: "launchpad-content",

            initialize: function(options) {
                _.bindAll(this);
                this.section = options.section;
                this.modules = options.modules;
                return this;
            },

            render: function() {
                console.log("Rendering the Launchpad page.");
                var html = _.template(template, { section: this.section, modules: this.modules });
                this.$el.html(html);
                return this;
            }
        });

        return Launchpad;
    });
