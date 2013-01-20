define(
    ['jquery', 'backbone', 'underscore', 'text!modules/attendance/markAttendance.html', 'service'],
    function($, Backbone, _, template, Service) {

        var MarkAttendance = Backbone.View.extend({

            events: {
                'click .save': 'save',
                'click .update': 'update'
            },

            update: function() {
                Service.updateAttendance(this.user._id, this.user.attendance[0]._id, { points: this.getAttendanceData().points }, function(){
                    Backbone.history.navigate("#/attendance", true);
                });
            },

            save: function() {
                Service.addAttendanceToUser(this.user._id, { attendance: this.getAttendanceData() }, function(){
                    Backbone.history.navigate("#/attendance", true);
                });
            },

            getAttendanceData: function() {
                return {
                    date: new Date(),
                    points: {
                        shirt: parseInt(this.$("#shirt").val()),
                        trousers: parseInt(this.$("#trousers").val()),
                        neckie: parseInt(this.$("#neckie").val()),
                        woggle: parseInt(this.$("#woggle").val()),
                        belt: parseInt(this.$("#belt").val()),
                        shoes: parseInt(this.$("#shoes").val()),
                        penPaper: parseInt(this.$("#penPaper").val()),
                        book: parseInt(this.$("#book").val()),
                        behaviour: parseInt(this.$("#behaviour").val())
                    }
                };
            },

            initialize: function(options) {
                _.bindAll(this);
                this.user = options.user;
                return this;
            },

            isToday: function(attendance) {
                if (attendance && attendance.length > 0 && attendance[0].date){
                    var millisBetween = new Date().getTime() - new Date(attendance[0].date).getTime();
                    return (Math.floor(millisBetween / (1000 * 60 * 60 * 24)) === 0);
                }

                return false;
            },

            points: function() {
                return _.extend({
                            shirt: 0,
                            trousers: 0,
                            neckie: 0,
                            belt: 0,
                            shoes: 0,
                            woggle: 0,
                            penPaper: 0,
                            book: 0,
                            behaviour: 0
                        },
                          this.isToday(this.user.attendance) ? this.user.attendance[0].points : {}
                        );
            },

            render: function() {
                console.log("Rendering the Mark Attendance page.");
                var html = _.template(template, { user: this.user, points: this.points(), updating: this.isToday(this.user.attendance) });
                this.$el.html(html);
                this.$('#book').val(this.points().book);
                this.$('#woggle').val(this.points().woggle);

                return this;
            }
        });

        return MarkAttendance;
    });
