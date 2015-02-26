Ext.define('SauceApp.view.Admin.Privileges.RoleAdd', {
	extend : 'Ext.window.Window',
	alias : 'widget.RoleAdd',

	autoShow : true,
	title : '添加角色',
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
				title : '角色信息',
				defaultType : 'textfield',
				defaults : {
					width : 280
				},
				items : [{
					fieldLabel : '角色名称',
					name : 'roleName'
				}, {
					fieldLabel : '上级角色',
					name : 'parentRoleName',
					xtype: 'combobox',
	                store: Ext.create('Ext.data.Store',{
				        model:'SauceApp.model.Admin.RoleModel',
				        proxy:{
				            type : 'ajax',
							api : {
								read : 'index.php/privileges/RoleListByAgent'
							},
							reader : {
								type : 'json',
								rootProperty : 'data',
								totalProperty : 'totalCount',
								successProperty : 'success',
								idProperty : 'roleName'
							}
				        }
				    }),
                	displayField: 'roleName'
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
			}],
			buttons : [{
				text : '保存',
				action : 'save'
	
			}, {
				text : '取消',
				scope : this,
				handler : this.close
			}]
		}];

		this.callParent(arguments);
	}
});
