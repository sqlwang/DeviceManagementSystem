Ext.define('SauceApp.view.Admin.Privileges.OperationAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.OperationAdd',

	autoShow : true,
	title : '添加操作',
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
				title : '操作信息',
				defaultType : 'textfield',
				defaults : {
					width : 280
				},
				items : [{
					fieldLabel : '操作名称',
					name : 'operationName'
				}, {
					fieldLabel : '业务规则',
					name : 'operationBizRule'
				}, {
					fieldLabel : '业务数据',
					name : 'operationData'
				}, {
					fieldLabel : '描述',
					name : 'operationDescription'
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
