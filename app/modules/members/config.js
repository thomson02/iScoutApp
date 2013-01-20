define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/members/members",
    "modules/members/viewMember",
    "modules/members/editMember"
], function(
    $,
    Backbone,
    _,
    Service,
    Members,
    ViewMember,
    EditMember
    ) {
    return {
        title: "Members",
        icon: "launchpad-member-list-button",
        link: "#/members/view",
        routes: {
            "members/view": "viewAllMembers",
            "members/view/:id": "viewMemberDetails",
            "members/edit/:id": "editMemberDetails"
        },
        funcs: {
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
            }
        }
    }
});



