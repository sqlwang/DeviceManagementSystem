Ext.define('SauceApp.view.Admin.Privileges.RoleAddAssign', {
	extend : 'Ext.window.Window',
	alias : 'widget.RoleAddAssign',
	autoShow : true,
	title : '添加角色权限',
	closable : true,
	closeAction : 'close',
	width : 200,
	minWidth : 350,
	height : 200,
	layout : 'fit',
	initComponent : function() {
		this.items = [{
			border: false,
			xtype : 'form',
			frame : false,
			width : 600,
			bodyPadding : 10,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side'
			},
			items : [{
				xtype: 'combobox',
				fieldLabel: '选择角色',
			    store: 'Admin.PRoleStore',
			    displayField: 'roleDescription',
			    valueField: 'roleName',
			    name: 'AssignRoleName'
			},{
				xtype: 'combobox',
				fieldLabel: '选择任务',
			    store: 'Admin.TaskStore',
			    displayField: 'taskDescription',
			    valueField: 'taskName',
			    name: 'AssignTaskName'
			}]
		}];

		this.buttons = [{
			text : '保存',
			action : 'save'

		}, {
			text : '取消',
			scope : this,
			handler : function(){
				this.close();
			}
		}];

		this.callParent(arguments);
	}
});
