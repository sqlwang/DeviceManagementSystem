/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SauceApp.view.main.Main', {
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
	items: [{
        title: "智能设备管理系统",
        region: "north",
        split: true,
		items : [{
			tbar : [{
				xtype : 'splitbutton',
				scale : 'medium',
				text : '操作员管理',
				menu : [{
					text : '修改密码',
					handler : function() {// adding a handler to "Add New X" menu item
						if(!win) {
							var win = Ext.widget('UserChangePassword');
						}
						win.show();
					}
				}]
			},{
				xtype : 'tbfill'
			},{
				xtype : 'button',
				scale : 'medium',
				handler: 'onClickButton',
				text : '退出'
			}]
		}]
    }, {
        //title: "West Pannel",
        region: "west",
        width: 250,
        collapsible: true,
        split: true,
        	bodyPadding: '0 10 0 10',
        items:[{
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            width: 250,
            expanderFirst: true,
            expanderOnly: false,
            //只有一个节点能展开
            singleExpand: false,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }]
    }, {
        //title: "Main Pannel",
        //html: "中",
        region: "center",
        xtype:'tabpanel',
        id: "maintab",
        items: [{
            title: 'Home',
            html : 'A simple tab'
        }]
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
