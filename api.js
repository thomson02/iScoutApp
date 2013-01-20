/**
 * Created with JetBrains WebStorm.
 * User: thomson02
 * Date: 18/01/2013
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');
var _ = require('underscore');

exports.configureRoutes = function(app, User, MetaData) {

    // SUPPORTING FUNCS
    var getUsers = function(req, res){
        User.find(function(err, users){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            _.each(users, function(user){
                user.attendance = [user.attendance[user.attendance.length - 1]]; // reduce size of data transfer by just sending the most recent
            });

            return res.json({ result: "Success", users: users });
        });
    };

    var getUserHeaderById = function(req, res){
      User.findOne({ _id: req.params.id }, function(err, user){
          user.attendance = [user.attendance[user.attendance.length - 1]]; // reduce size of data transfer by just sending the most recent
          return res.json(user);
      });
    };

    var createUser = function(req, res){
        var newUser = new User(req.body)
        newUser.save(function(err, saved){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            return res.json({ result: "Success", _id: saved._id });
        })
    };

    var editUserHeader = function(req, res){
      if (req.body.attendance) {
          delete req.body.attendance;
      }

      User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, updated){
          if (err) {
              console.log(err);
              return res.json({ result: "Failed" });
          }

          return res.json({ result: "Success", _id: updated._id });
      });
    };

    var getAttendanceForUser = function(req, res){
        User.findOne({ _id: req.params.id }, function(err, user){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            return res.json(user.attendance);
        });
    };

    var addAttendanceToUser = function(req, res){
        User.update({ _id: req.params.id }, { $push: { attendance: req.body.attendance } }, { upsert: true }, function(err, updated){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            return res.json({ result: "Success", _id: updated._id });
        });
    };

    var updateAttendance = function(req, res){
        User.findOne({ _id: req.params.id }, function(err, user){
            if (err) {
                console.log(err);
                return res.json({ result: "Failed" });
            }

            var attendance = _.find(user.attendance, function(attend){
                return attend._id == req.params.attendanceId;
            });

            if (attendance) {
                attendance.points = req.body.points;
                user.save();
                return res.json({ result: "Success" });
            }

            return res.json({ result: "Failed" });
        });
    };

    var getListOfPatrols = function(req, res) {
      MetaData.findOne({ key: 'patrols' }, function(err, patrols){
          if (err || !patrols) {
              console.log(err);
              return res.json({ result: "Failed" });
          }

          return res.json({ result: "Success", patrols: JSON.parse(patrols.value) });
      });
    };

    var getMembersOfPatrol = function(req, res){
      User.find({ 'patrol.name': req.params.patrol }, function(err, members){
          if (err) {
              console.log(err);
              return res.json({ result: "Failed" });
          }

          return res.json({ result: "Success", members: members });
      });
    };

    // ROUTES
    app.get('/api/users', getUsers);
    app.get('/api/user/:id', getUserHeaderById); //
    app.post('/api/user', createUser);
    app.put('/api/user/:id', editUserHeader);

    app.get('/api/attendance/user/:id', getAttendanceForUser); //
    app.post('/api/attendance/user/:id', addAttendanceToUser);
    app.post('/api/attendance/user/:id/attendance/:attendanceId', updateAttendance);

    app.get('/api/patrols', getListOfPatrols); //
    app.get('/api/patrols/:patrol', getMembersOfPatrol); //
};