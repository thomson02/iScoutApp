define(
    ['jquery', 'backbone', 'underscore', 'text!templates/inspection.html'],
    function($, Backbone, _, template) {

        var Inspection = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.patrols = _.groupBy(options.users, function(user) { return user.patrol.name; });
                _.each(this.patrols, function(patrol){
                    patrol = _.sortBy(patrol, function(patrolMember){ return patrolMember.name; });
                });

                return this;
            },

            render: function() {
                console.log("Rendering the Inspection page.");
                var html = _.template(template, { patrols: this.patrols });
                this.$el.html(html);
                return this;
            }
        });

        return Inspection;
    });
