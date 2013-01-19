/**
 * Created with JetBrains WebStorm.
 * User: thomson02
 * Date: 18/01/2013
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */

var utils = require('utils');

exports.configureRoutes = function(app, User, MetaData) {

    // ROUTES
    app.get('/api/user/:id', getUserHeaderById);
    app.post('/api/user/:id', createUser);
    app.put('/api/user/:id', editUserHeader);

    app.get('/api/attendance/user/:id', getAttendanceForUser);
    app.post('/api/attendance/user/:id', addAttendanceToUser);

    app.get('/api/patrols', getListOfPatrols);
    app.get('/api/patrols/:patrol', getMembersOfPatrol);


    // SUPPORTING FUNCS
    var getUserHeaderById = function(req, res){
      User.findOne({ _id: req.params.id }, function(err, user){
          user.attendance = []; // empty to reduce size of data transfer
          return res.json(user);
      });
    };

    var createUser = function(req, res){
        var newUser = new User(req.body)
        newUser._id = req.params.id;

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

    var getListOfPatrols = function(req, res) {
      MetaData.find({ key: 'patrols' }, function(err, patrols){
          if (err) {
              console.log(err);
              return res.json({ result: "Failed" });
          }

          return res.json({ result: "Success", patrols: JSON.parse(patrols) });
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
};