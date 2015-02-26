/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SauceApp.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'SauceApp.view.main.MainController',
        'SauceApp.view.main.MainModel',
        'SauceApp.view.layout.Footer',
        'SauceApp.view.layout.Header',
        'SauceApp.view.layout.Left',
        'SauceApp.view.layout.Middle',
        'SauceApp.view.layout.Right'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    items: [ {xtype:'layoutheader'},
    //{xtype:'layoutfooter'},
    {xtype:'layoutleft'},
    //{xtype:'layoutright'},
    {xtype:'layoutmiddle'}//middle
    ]
});
