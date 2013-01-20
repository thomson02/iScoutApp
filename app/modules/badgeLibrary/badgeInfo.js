define(
    ['jquery', 'backbone', 'underscore', 'text!modules/badgeLibrary/badgeInfo.html', 'badgeData'],
    function($, Backbone, _, template, BadgeData) {

        var BadgeInfo = Backbone.View.extend({

            initialize: function(options) {
                _.bindAll(this);
                this.section = options.section;
                this.group = options.group;
                this.badge = BadgeData[this.section][this.group][options.badgeIndex];
                return this;
            },

            render: function() {
                console.log("Rendering the Badge Info page.");
                var html = _.template(template, { group: this.group, badge: this.badge });
                this.$el.html(html);
                return this;
            }
        });

        return BadgeInfo;
    });
