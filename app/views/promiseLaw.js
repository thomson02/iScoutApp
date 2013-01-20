define(
    ['jquery', 'backbone', 'underscore', 'text!templates/promiseLaw.html', 'sectionData'],
    function($, Backbone, _, template, SectionData) {

        var PromiseLaw = Backbone.View.extend({

            events: {
                'click a.promise, a.law': 'toggleView'
            },

            toggleView: function(e){
                this.$("div.promise").toggle($(e.currentTarget).hasClass("promise"));
                this.$("div.law").toggle($(e.currentTarget).hasClass("law"));
            },

            initialize: function(options) {
                _.bindAll(this);
                this.section = options.section;
                return this;
            },

            render: function() {
                console.log("Rendering the Promise & Law page.");
                var html = _.template(template, { sectionData: SectionData[this.section] });
                this.$el.html(html);
                return this;
            }
        });

        return PromiseLaw;
    });
