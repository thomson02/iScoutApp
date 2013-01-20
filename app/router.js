define(["jquery", "backbone", "underscore", "service", "views/launchpad", "views/members", "views/viewMember", "views/editMember", "views/promiseLaw", "views/badgeGroups", "views/badgeList", "views/badgeInfo", "views/inspection", "jquerymobile"],
    function($, Backbone, _, Service, Launchpad, Members, ViewMember, EditMember, PromiseLaw, BadgeGroups, BadgeList, BadgeInfo, Inspection) {

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
                "members/view": "viewAllMembers",
                "members/view/:id": "viewMemberDetails",
                "members/edit/:id": "editMemberDetails",
                "promiseLaw/:section": "promiseLaw",
                "badgeLibrary/:section": "badgeGroups",
                "badgeLibrary/:section/:group": "badgeList",
                "badgeLibrary/:section/:group/:badgeIndex": "badgeInfo",
                "inspection": "inspection",
                "*actions": "launchpad"
            },

            initialize: function(options) {
                this.appView = new AppView();
            },

            launchpad: function() {
              this.appView.showView(new Launchpad({
                session: this.session
              }));
            },

            viewAllMembers: function() {
                var that = this;
                Service.getUsers(function(res){
                    that.appView.showView(new Members({
                        users: res.users
                    }));
                });
            },

            viewMemberDetails: function(id){
                var that = this;
                Service.getUserHeaderById(id, function(res) {
                    that.appView.showView(new ViewMember({
                        user: res
                    }));
                });
            },

            editMemberDetails: function(id){
                var that = this;
                var userPromise = Service.getUserHeaderById(id);
                var patrolsPromise = Service.getListOfPatrols();

                $.when(userPromise, patrolsPromise).done(function(userParams, patrolParams) {
                    that.appView.showView(new EditMember({
                        user: userParams[0],
                        patrols: patrolParams[0].patrols.Patrols
                    }));
                });

            },

            promiseLaw: function(section){
              this.appView.showView(new PromiseLaw({
                  section: section
              }))
            },

            badgeGroups: function(section) {
                this.appView.showView(new BadgeGroups({
                    section: section
                }));
            },

            badgeList: function(section, group){
                this.appView.showView(new BadgeList({
                    section: section,
                    group: group
                }));
            },

            badgeInfo: function(section, group, badgeIndex){
                this.appView.showView(new BadgeInfo({
                    section: section,
                    group: group,
                    badgeIndex: badgeIndex
                }));
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
