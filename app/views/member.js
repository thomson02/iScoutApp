define(
    ['jquery', 'backbone', 'underscore', 'text!templates/member.html'],
    function($, Backbone, _, template) {

        var Members = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.user = options.user;
                return this;
            },

            render: function() {
                console.log("Rendering the Member page.");
                var html = _.template(template, { member: this.user });
                this.$el.html(html);
                return this;
            }
        });

        return Members;
    });
