requirejs(['jquery', 'backbone', 'router', "modules/badgeLibrary/config", "modules/members/config", "modules/promiseLaw/config", "modules/attendance/config"],
  function($, Backbone, Router, BadgeLibrary, Members, PromiseLaw, Attendance) {
    $(function() {
        new Router({
            section: "Scouts",
            modules: [Members, PromiseLaw, BadgeLibrary]
        });

        Backbone.history.start({ pushState: false, root: "/mobile.html" });
    });
});


