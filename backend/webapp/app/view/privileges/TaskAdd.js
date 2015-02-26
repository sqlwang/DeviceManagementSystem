Ext.define('SauceApp.view.Admin.Privileges.TaskAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.TaskAdd',
	autoShow : true,
	title : '添加任务',
	closable : true,
	closeAction : 'hide',
	width : 400,
	minWidth : 350,
	height : 350,
	border: 0,
	layout :  'fit',
	initComponent : function() {
		
		this.items = [{
			xtype : 'form',
			//frame : true,
			width : 340,
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side'
			},
			items : [{
				xtype : 'fieldset',
				title : '任务信息',
				defaultType : 'textfield',
				defaults : {
					width : 280
				},
				items : [
				{
					fieldLabel : '父任务',
					name : 'parentTaskName',
					xtype : 'combo',
					store : 'Admin.TaskStore',
					displayField: 'taskDescription',
					emptyText: '请选择一个父任务',
					valueField: 'taskName'
				},
				{
					fieldLabel : '任务名称',
					name : 'taskName'
				}, 
				{
					fieldLabel : '业务规则',
					name : 'taskBizRule'
				}, 
				{
					fieldLabel : '业务数据',
					name : 'taskData'
				}, 
				{
					fieldLabel : '描述',
					name : 'taskDescription'
				}
				]
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
