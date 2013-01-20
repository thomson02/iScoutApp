define(
    ['jquery', 'backbone', 'underscore', 'text!modules/members/editMember.html', 'service'],
    function($, Backbone, _, template, Service) {

        var Members = Backbone.View.extend({

            events: {
              'change #patrol': 'rankSelectMenuChanged',
              'click .save': 'saveChanges'
            },

            saveChanges: function(e) {
                var that = this;
                this.user.name = this.$("#name").val();
                this.user.email = this.$("#email").val();
                this.user.phone = this.$("#phone").val();
                this.user.mobile = this.$("#mobile").val();
                this.user.patrol = {
                    name: this.$('#patrol').val() === "NEW" ? this.$("#newPatrol").val() : this.$('#patrol').val(),
                    rank: this.$("#rank").val()
                };
                this.user.medical = this.$("#medical").val();

                Service.editUserHeader(this.user, function() {
                    Backbone.history.navigate("#/members/view/" + that.user._id, true);
                });
            },

            rankSelectMenuChanged: function(e){
                this.$('#newPatrolContainer').toggle(this.$('#patrol').val() === "NEW");
            },

            initialize: function(options) {
                _.bindAll(this);
                this.user = options.user;
                this.patrols = options.patrols;
                return this;
            },

            render: function() {
                console.log("Rendering the Edit Member page.");
                var html = _.template(template, { member: this.user, patrols: this.patrols });
                this.$el.html(html);
                this.$('#patrol').val(this.user.patrol.name);
                this.$('#rank').val(this.user.patrol.rank);
                return this;
            }
        });

        return Members;
    });
