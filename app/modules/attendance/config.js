define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/attendance/attendance",
    "modules/attendance/markAttendance"
], function(
    $,
    Backbone,
    _,
    Service,
    Attendance,
    MarkAttendance
    ) {
    return {
        title: "Attendance",
        icon: "launchpad-attendance-button",
        link: "#/attendance",
        routes: {
            "attendance": "attendance",
            "attendance/:id": "markAttendance"
        },
        funcs: {
            attendance: function() {
                var that = this;
                Service.getUsers(function(res){
                    that.appView.showView(new Attendance({
                        users: res.users
                    }));
                });
            },
            markAttendance: function(id){
                var that = this;
                Service.getUserHeaderById(id, function(res){
                    that.appView.showView(new MarkAttendance({
                        user: res
                    }));
                });
            }
        }
    }
});



