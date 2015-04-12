Ext.define('SauceApp.view.privileges.PermissionList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.PermissionList',
	loadMask: true,
	
	store: 'privileges.PermissionStore',
	initComponent : function() {
		if (Ext.isString(this.store)) {
			this.store = Ext.create('SauceApp.store.privileges.PermissionStore');
		}
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-Permission-add',
				text : '添加权限',
				scope : this,
				action : 'addPermission'
			}, {
				iconCls : 'icon-Permission-edit',
				text : '修改权限',
				scope : this,
				action : 'editPermission'
			},{
				iconCls: 'icon-Permission-delete',
				text : '删除权限',
				id: 'adminPermissionDel',
				disabled : true,
				action : 'delPermission',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '任务名称',
			dataIndex : 'PermissionName',
			flex : 1
		},{
			header : '业务规则',
			dataIndex : 'PermissionBizRule',
			flex : 1
		},{
			header : '数据字典',
			dataIndex : 'PermissionData',
			flex : 1
		},{
			header : '描述',
			dataIndex : 'PermissionDescription',
			flex : 1
		}];

		this.bbar = new Ext.PagingToolbar({
			store : this.store,
			displayInfo : true,
			pageSize : 10
		});
		this.callParent();
		this.store.load();
	}
}); 