Ext.define('SauceApp.view.privileges.RoleList', {
	extend : 'Ext.grid.Panel',
	
	xtype : 'RoleList',
	loadMask: true,
	id: 'adminRoleList',
	store: 'privileges.RoleStore',
	initComponent : function() {
		if (Ext.isString(this.store)) {
			this.store = Ext.create('SauceApp.store.privileges.RoleStore');
		}
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-role-add',
				text : '添加角色',
				scope : this,
				action : 'addRole'
			}, {
				iconCls : 'icon-role-edit',
				text : '修改角色',
				scope : this,
				action : 'editRole'
			},{
				iconCls: 'icon-role-delete',
				text : '删除角色',
				id: 'adminRoleDel',
				disabled : true,
				action : 'delRole',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '角色名称',
			dataIndex : 'roleName',
			flex : 1
		},{
			header : '业务规则',
			dataIndex : 'roleBizRule',
			flex : 1
		},{
			header : '数据字典',
			dataIndex : 'roleData',
			flex : 1
		},{
			header : '描述',
			dataIndex : 'roleDescription',
			flex : 1
		}];

		this.bbar = new Ext.PagingToolbar({
			store : this.store,
			displayInfo : true,
			pageSize : 10
		});
		this.callParent(arguments);
		this.store.load();
	}
}); 
//
//
//Ext.define('SauceApp.view.Admin.Privileges.RoleEdit', {
//	extend : 'Ext.window.Window',
//	alias : 'widget.RoleEdit',
//
//	autoShow : true,
//	title : '修改角色',
//	closable : true,
//	closeAction : 'hide',
//	width : 400,
//	minWidth : 350,
//	height : 300,
//	border: 0,
//	layout :  'fit',
//	initComponent : function() {
//		this.items = [{
//			xtype : 'form',
//			frame : true,
//			width : 340,
//			bodyPadding : 0,
//			waitMsgTarget : true,
//			fieldDefaults : {
//				labelAlign : 'right',
//				labelWidth : 105,
//				msgTarget : 'side'
//			},
//			items : [{
//				xtype : 'fieldset',
//				title : '角色信息',
//				defaultType : 'textfield',
//				defaults : {
//					anchor: '100%'
//				},
//				items : [{
//					hidden: true,
//					name : 'roleName'
//				}, {
//					fieldLabel : '业务规则',
//					name : 'roleBizRule'
//				}, {
//					fieldLabel : '业务数据',
//					name : 'roleData'
//				}, {
//					fieldLabel : '描述',
//					name : 'roleDescription'
//				}]
//			}]
//		}];
//
//		this.buttons = [{
//			text : '保存',
//			action : 'save'
//
//		}, {
//			text : '取消',
//			scope : this,
//			handler : this.close
//		}];
//
//		this.callParent(arguments);
//	}
//});
//Ext.define('SauceApp.view.Admin.Privileges.RoleAdd', {
//	extend : 'Ext.window.Window',
//	alias : 'widget.RoleAdd',
//
//	autoShow : true,
//	title : '添加角色',
//	closable : true,
//	closeAction : 'hide',
//	width : 400,
//	minWidth : 350,
//	height : 300,
//	border: 0,
//	layout :  'fit',
//	initComponent : function() {
//		this.items = [{
//			xtype : 'form',
//			//frame : true,
//			width : 340,
//			bodyPadding : 0,
//			waitMsgTarget : true,
//			fieldDefaults : {
//				labelAlign : 'right',
//				labelWidth : 85,
//				msgTarget : 'side'
//			},
//			items : [{
//				xtype : 'fieldset',
//				title : '角色信息',
//				defaultType : 'textfield',
//				defaults : {
//					width : 280
//				},
//				items : [{
//					fieldLabel : '角色名称',
//					name : 'roleName'
//				}, {
//					fieldLabel : '上级角色',
//					name : 'parentRoleName',
//					xtype: 'combobox',
//	                store: Ext.create('Ext.data.Store',{
//				        model:'SauceApp.model.Admin.RoleModel',
//				        proxy:{
//				            type : 'ajax',
//							api : {
//								read : 'index.php/privileges/RoleListByAgent'
//							},
//							reader : {
//								type : 'json',
//								rootProperty : 'data',
//								totalProperty : 'totalCount',
//								successProperty : 'success',
//								idProperty : 'roleName'
//							}
//				        }
//				    }),
//                	displayField: 'roleName'
//				}, {
//					fieldLabel : '业务规则',
//					name : 'roleBizRule'
//				}, {
//					fieldLabel : '业务数据',
//					name : 'roleData'
//				}, {
//					fieldLabel : '描述',
//					name : 'roleDescription'
//				}]
//			}],
//			buttons : [{
//				text : '保存',
//				action : 'save'
//	
//			}, {
//				text : '取消',
//				scope : this,
//				handler : this.close
//			}]
//		}];
//
//		this.callParent(arguments);
//	}
//});
