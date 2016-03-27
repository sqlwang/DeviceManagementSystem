Ext.define('SauceApp.view.Admin.Privileges.TaskAssignAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.TaskAssignAdd',

	autoShow : true,
	title : '添加任务权限',
	closable : true,
	closeAction : 'colse',
	width : 250,
	minWidth : 350,
	height : 250,
	border : 0,
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
				fieldLabel: '选择任务',
			    store: 'Admin.TaskStore',
			    displayField: 'taskDescription',
			    valueField: 'taskName',
			    name: 'TaskAssignTaskName'
			},{
				xtype: 'combobox',
				fieldLabel: '选择子任务',
			    store: 'Admin.TaskStore',
			    displayField: 'taskDescription',
			    valueField: 'taskName',
			    name: 'TaskAssigSubTaskName'
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
