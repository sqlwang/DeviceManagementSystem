Ext.define('SauceApp.view.Admin.Privileges.RoleAssignList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.RoleAssignList',
	loadMask: true,
	id: 'adminRoleAssignList',
	store: 'Admin.RoleAssignStore',
	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-assign-add',
				text : '分配角色权限',
				scope : this,
				action : 'adminRoleAddAssign'
			},{
				iconCls: 'icon-assign-delete',
				text : '删除角色分配',
				id: 'adminRoleAssignDel',
				disabled : true,
				action : 'RoleAssignDel',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '角色名称',
			dataIndex : 'roleName',
			flex : 1
		},{
			header : '角色说明',
			dataIndex : 'roleDescription',
			flex : 1
		},{
			header : '分配权限类型',
			dataIndex : 'assignType',
			flex : 1,
		  	renderer: function(value, metaData, record, row, col, store, gridView){
		   		if(value == 1)
		   			return '任务';
		   			
		   		if(value == 0)
		   			return '操作';
		   		return value;
		  	}
		},{
			header : '权限名称',
			dataIndex : 'assignName',
			flex : 1
		},{
			header : '权限说明',
			dataIndex : 'assignDescription',
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