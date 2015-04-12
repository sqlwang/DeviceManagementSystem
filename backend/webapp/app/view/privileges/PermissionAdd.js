Ext.define('SauceApp.view.privileges.PermissionAdd', {
	extend : 'Ext.window.Window',
	
	xtype: 'permission-add',
	autoShow : true,
	title : '添加任务',
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
			//frame : true,
			bodyPadding : 0,
			waitMsgTarget : true,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 85,
				msgTarget : 'side'
			},
			defaultType : 'textfield',
			padding: '10 0 0 10',
			items : [{
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
