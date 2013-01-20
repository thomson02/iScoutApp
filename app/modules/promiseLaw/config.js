define([
    "jquery",
    "backbone",
    "underscore",
    "service",
    "modules/promiseLaw/promiseLaw"
], function(
    $,
    Backbone,
    _,
    Service,
    PromiseLaw
    ) {
    return {
        title: "Promise & Law",
        icon: "launchpad-promise-button",
        link: "#/promiseLaw",
        routes: {
            "promiseLaw": "promiseLaw"
        },
        funcs: {
            promiseLaw: function(){
                var that = this;
                this.appView.showView(new PromiseLaw({
                    section: that.section
                }))
            }
        }
    }
});



