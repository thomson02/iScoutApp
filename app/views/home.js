define(
    ['jquery', 'backbone', 'underscore', 'text!templates/home.html'],
    function($, Backbone, _, homeTemplate) {

        var HomePage = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                return this;
            },

            render: function() {
                console.log("Rendering the Home page.");
                var html = _.template(homeTemplate, {});
                this.$el.html(html);
                return this;
            }
        });

        return HomePage;
    });
