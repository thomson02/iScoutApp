requirejs.config({
    deps: ['main'],
    paths: {
        'jquery': 'components/jquery/jquery',
        'jquerymobile': 'components/jquerymobile/jquerymobile',
        'underscore': 'components/underscore/underscore',
        'backbone': 'components/backbone/backbone',
        'text': 'components/requirejs/plugins/text',
        'jqm.config': 'components/jquerymobile/jqm.config',
        'service': 'components/service',
        'badgeData': 'components/data/badgeData',
        'sectionData': 'components/data/sectionData'
    },
    shim: {
        'jquery': {
            exports: 'jQuery',
            init: function($) {
                return this.jQuery.noConflict();
            }
        },
        'jqm.config': {
            deps: ['jquery']
        },
        'jquerymobile': {
            deps: ['jquery', 'jqm.config'],
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone',
            init: function($, _) {

                // Extend Backbone object
                Backbone.View.prototype.close = function() {
                    this.$el.empty();   // this.remove();
                    this.unbind();
                    if (this.onClose) {
                        this.onClose();
                    }
                };

                return Backbone;
            }
        }
    }
});
