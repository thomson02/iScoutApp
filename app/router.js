define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/launchpad/launchpad",
    "jquerymobile"],
    function(
        $,
        Backbone,
        _,
        Service,
        Launchpad) {

        /* Controls the displaying of Backbone Views. */
        var AppView = Backbone.Model.extend({
            initialize: function(options){
                _.bindAll(this);
                this.currentView = null;
            },

            closeView: function(view) {
                if (view && view.close) {
                    view.close();
                }

                $('[data-role="page"]:not(.ui-page-active)').not(this.currentView.$el).remove();
            },

            showView: function(view) {
                var previousView = this.currentView;

                this.currentView = view.render();
                this.currentView.$el.attr('data-role', 'page')
                $('body').append(this.currentView.$el);

                $.mobile.changePage(this.currentView.$el, {
                    changeHash: false,
                    transition: "slide"
                });

                this.closeView(previousView);
            }
        });

        /* The backbone router */
        var Router = Backbone.Router.extend({

            routes: {
                "*actions": "launchpad"
            },

            initialize: function(options) {
                var that = this;
                this.appView = new AppView();
                this.section = options.section;
                this.modules = options.modules;

                // bolt on plugged in apps
                _.each(this.modules, function(module){
                    _.extend(that, module.funcs);
                    _.each(module.routes, function(val, key){
                        that.route(key, val);
                    });
                });
            },

            launchpad: function() {
              this.appView.showView(new Launchpad({
                section: this.section,
                modules: this.modules
              }));
            }
        });

        return Router;
    });
