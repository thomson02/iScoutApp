define(
    ['jquery', 'backbone', 'underscore', 'text!modules/badgeLibrary/badgeGroups.html', 'badgeData'],
    function($, Backbone, _, template, BadgeData) {

        var BadgeGroups = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.section = options.section;
                return this;
            },

            render: function() {
                console.log("Rendering the Badge Groups page.");
                var html = _.template(template, { badgeData: BadgeData[this.section] });
                this.$el.html(html);
                return this;
            }
        });

        return BadgeGroups;
    });
