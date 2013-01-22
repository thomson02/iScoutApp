define(['jquery'], function ($) {
    console.log('jquery.mobile-config');
    $(document).bind("mobileinit", function () {
        console.log('mobileinit!');
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    });
});