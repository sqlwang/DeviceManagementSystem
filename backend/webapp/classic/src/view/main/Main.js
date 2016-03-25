/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SauceApp.view.main.Main', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
		'Ext.list.Tree',
        'SauceApp.view.main.MainController',
        'SauceApp.view.main.MainModel',
        'SauceApp.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',


	layout: "border",
    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
	items: [{
        title: "智能设备管理系统",
        region: "north",
        height: 80,
    }, {
        title: "West Pannel",
        region: "west",
        width: 250,
        items:[{
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            width: 250,
            expanderFirst: false,
            expanderOnly: false,
            //只有一个节点能展开
            singleExpand: true,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }]
    }, {
        title: "Main Pannel",
        html: "中",
        region: "center"
    }]
    // items: [{
        // title: 'Home',
        // iconCls: 'fa-home',
        // // The following grid shares a store with the classic version's grid as well!
        // items: [{
            // xtype: 'mainlist'
        // }]
    // }, {
        // title: 'Users',
        // iconCls: 'fa-user',
        // bind: {
            // html: '{loremIpsum}'
        // }
    // }, {
        // title: 'Groups',
        // iconCls: 'fa-users',
        // bind: {
            // html: '{loremIpsum}'
        // }
    // }, {
        // title: 'Settings',
        // iconCls: 'fa-cog',
        // bind: {
            // html: '{loremIpsum}'
        // }
    // }]
});
