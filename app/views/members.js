define(
    ['jquery', 'backbone', 'underscore', 'text!templates/members.html'],
    function($, Backbone, _, template) {

        var Members = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.users = _.sortBy(options.users, function(user) { return user.name; });
                return this;
            },

            render: function() {
                console.log("Rendering the Members page.");
                var html = _.template(template, { users: this.users });
                this.$el.html(html);
                return this;
            }
        });

        return Members;
    });
