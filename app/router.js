define(["jquery", "backbone", "underscore", "service", "views/home", "views/members", "views/inspection", "views/member", "jquerymobile"],
    function($, Backbone, _, Service, HomePage, Members, Inspection, Member) {

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
                "members": "members",
                "members/:id": "memberDetails",
                "inspection": "inspection",
                "*actions": "home"
            },

            initialize: function(options) {
                this.appView = new AppView();
            },

            home: function() {
              this.appView.showView(new HomePage({
                session: this.session
              }));
            },

            members: function() {
                var that = this;
                Service.getUsers(function(res){
                    that.appView.showView(new Members({
                        users: res.users
                    }));
                });
            },

            memberDetails: function(id){
                var that = this;
                Service.getUserHeaderById(id, function(res) {
                    that.appView.showView(new Member({
                        user: res
                    }));
                });
            },

            inspection: function() {
                var that = this;
                Service.getUsers(function(res){
                    that.appView.showView(new Inspection({
                        users: res.users
                    }));
                });
            }
        });

        return Router;
    });
