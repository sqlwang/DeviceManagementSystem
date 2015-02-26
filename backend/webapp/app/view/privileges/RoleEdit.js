Ext.define('SauceApp.view.Admin.Privileges.RoleEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.RoleEdit',

	autoShow : true,
	title : '修改角色',
	closable : true,
	closeAction : 'hide',
	width : 400,
	minWidth : 350,
	height : 300,
	border: 0,
	layout :  'fit',
	initComponent : function() {
		this.items = [{
			xtype : 'form',
			frame : true,
			width : 340,
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 105,
				msgTarget : 'side'
			},
			items : [{
				xtype : 'fieldset',
				title : '角色信息',
				defaultType : 'textfield',
				defaults : {
					anchor: '100%'
				},
				items : [{
					hidden: true,
					name : 'roleName'
				}, {
					fieldLabel : '业务规则',
					name : 'roleBizRule'
				}, {
					fieldLabel : '业务数据',
					name : 'roleData'
				}, {
					fieldLabel : '描述',
					name : 'roleDescription'
				}]
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
