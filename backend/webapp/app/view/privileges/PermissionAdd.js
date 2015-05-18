Ext.define('SauceApp.view.privileges.PermissionAdd', {
	extend : 'Ext.window.Window',
	
	xtype: 'permission-add',
	autoShow : true,
	title : '添加权限',
	closable : true,
	closeAction : 'destory',
	width : 400,
	minWidth : 350,
	height : 350,
	border: 0,
	layout :  'fit',
	initComponent : function() {
		
		this.items = [{
			xtype : 'form',
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side',
				width: 320
			},
			defaultType : 'textfield',
			padding: '10 0 0 10',
			items : [{
				name : '_csrf',
				hidden: true
			},{
				fieldLabel : '权限描述',
				name : 'PermissionDescription'
			},{
				fieldLabel : '权限名称',
				name : 'PermissionName'
			},{
				fieldLabel : '父级权限',
				name : 'ParentPermissionName'
			}, {
				fieldLabel : '导航栏排序',
				name : 'sort'
			},
			{
				fieldLabel : 'ExtJS类名称',
				name : 'ExtJSClass'
			}]
		}];

		this.buttons = [{
			text : '保存',
			action : 'save'

		}, {
			text : '取消',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});
