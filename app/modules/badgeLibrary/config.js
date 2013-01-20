define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/badgeLibrary/badgeGroups",
    "modules/badgeLibrary/badgeList",
    "modules/badgeLibrary/badgeInfo"
], function(
    $,
    Backbone,
    _,
    Service,
    BadgeGroups,
    BadgeList,
    BadgeInfo
    ) {

    return {
        title: "Badge Library",
        icon: "launchpad-badge-library-button",
        link: "#/badgeLibrary",
        routes: {
            "badgeLibrary": "badgeGroups",
            "badgeLibrary/:group": "badgeList",
            "badgeLibrary/:group/:badgeIndex": "badgeInfo"
        },
        funcs: {
            badgeGroups: function() {
                var that = this;
                this.appView.showView(new BadgeGroups({
                    section: that.section
                }));
            },

            badgeList: function(group){
                var that = this;
                this.appView.showView(new BadgeList({
                    section: that.section,
                    group: group
                }));
            },

            badgeInfo: function(group, badgeIndex){
                var that = this;
                this.appView.showView(new BadgeInfo({
                    section: that.section,
                    group: group,
                    badgeIndex: badgeIndex
                }));
            }
        }
    }
});



