define(
    ['jquery', 'backbone', 'underscore', 'text!modules/members/viewMember.html'],
    function($, Backbone, _, template) {

        var Members = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.user = options.user;
                return this;
            },

            render: function() {
                console.log("Rendering the View Member page.");
                var html = _.template(template, { member: this.user });
                this.$el.html(html);
                return this;
            }
        });

        return Members;
    });
