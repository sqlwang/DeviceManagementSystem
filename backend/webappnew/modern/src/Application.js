
Ext.define('SauceApp.Application', {
    extend: 'Ext.app.Application',

    name: 'SauceApp',

    stores: [
        // TODO: add global / shared stores here
    ],
    views: [
    ],
    launch: function () {
 
    },
    onAppUpdate: function () {
        window.location.reload();
    }
});