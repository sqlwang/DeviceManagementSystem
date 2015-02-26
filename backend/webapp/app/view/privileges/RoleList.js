Ext.define('SauceApp.view.Admin.Privileges.RoleList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.RoleList',
	loadMask: true,
	id: 'adminRoleList',
	store: 'Admin.PRoleStore',
	initComponent : function() {
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
	}
}); 