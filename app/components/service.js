define(['jquery'], function($) {

    var Service = {

        getUsers: function(callback){
            return $.ajax({
                url: "/api/users",
                type: "GET",
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        getUserHeaderById: function(id, callback){
            return $.ajax({
                url: "/api/user/" + id,
                type: "GET",
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        createUser: function(userData, callback){
            return $.ajax({
                url: "/api/user/",
                type: "POST",
                data: userData,
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        editUserHeader: function(userData, callback){
            return $.ajax({
                url: "/api/user/" + userData._id,
                type: "PUT",
                data: userData,
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        getAttendanceForUser:function(id, callback){
            return $.ajax({
                url: "/api/attendance/user/" + id,
                type: "GET",
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        addAttendanceToUser: function(id, attendanceData, callback){
            return $.ajax({
                url: "/api/attendance/user/" + id,
                type: "POST",
                data: attendanceData,
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        updateAttendance: function(userId, attendanceId, attendanceData, callback){
            return $.ajax({
                url: "/api/attendance/user/" + userId + "/attendance/" + attendanceId,
                type: "POST",
                data: attendanceData,
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        getListOfPatrols: function(callback){
            return $.ajax({
                url: "/api/patrols",
                type: "GET",
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        },

        getMembersOfPatrol: function(patrol, callback){
            return $.ajax({
                url: "/api/patrols/" + patrol,
                type: "GET",
                success: function(res) {
                    if (callback) { callback(res); }
                }
            });
        }
    };

    return Service;
});
