define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/attendance/attendance"
], function(
    $,
    Backbone,
    _,
    Service,
    Attendance
    ) {
    return {
        title: "Attendance",
        icon: "launchpad-attendance-button",
        link: "#/attendance",
        routes: {
            "attendance": "attendance"
        },
        funcs: {
            attendance: function() {
                this.appView.showView(new Attendance());
            }
        }
    }
});



