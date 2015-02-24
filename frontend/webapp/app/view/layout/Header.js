Ext.define('SauceApp.view.layout.Header', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.layoutheader',
	id : 'app-header',
	title : '设备管理系统',
	split : true,
	minSize : 100,
	maxSize : 200,
	margins : '5',
	region : 'north',
	layout : 'fit',
	border:0,
	items : [{
		tbar : [{
			xtype : 'splitbutton',
			scale : 'medium',
			text : '操作员管理',
			menu : [{
				text : '操作员管理',
				scale : 'medium',
				id:'operator_manage_privilege',
				disabled : true,
				hidden  : true,
				handler : function() {// adding a handler to "Add New X" menu item
					var UserManagement = Ext.create('SauceApp.view.Admin.User.UserManagement');
					if(!win) {
						var win = Ext.create('widget.window', {
							title : '操作员管理',
							closable : true,
							closeAction : 'close',
							//animateTarget: this,
							width : 700,
							height : 400,
							layout : 'fit',
							bodyStyle : 'padding: 5px;',
							items : [
								UserManagement
//								{
//								xtype: 'UserManagement'
//							}
							]  
						});
						Ext.getCmp('adminUserList').getStore().load();
					}
					win.show();
				}
			}, {
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
	}],
	initComponent : function() {
		this.callParent(arguments);
	}

});
