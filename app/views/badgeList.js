define(
    ['jquery', 'backbone', 'underscore', 'text!templates/badgeList.html', 'badgeData'],
    function($, Backbone, _, template, BadgeData) {

        var BadgeList = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.section = options.section;
                this.group = options.group;
                return this;
            },

            render: function() {
                console.log("Rendering the Badge List page.");
                var html = _.template(template, { badgeData: BadgeData[this.section][this.group], section: this.section, group: this.group });
                this.$el.html(html);
                return this;
            }
        });

        return BadgeList;
    });
