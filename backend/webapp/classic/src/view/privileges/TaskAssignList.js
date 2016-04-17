Ext.define('SauceApp.view.Admin.Privileges.TaskAssignList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.TaskAssignList',
	loadMask: true,
	id: 'adminTaskAssignList',
	store: 'Admin.TaskAssignStore',
	 margin: 15,
	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-assign-add',
				text : '分配任务权限',
				scope : this,
				action : 'TaskAssignAdd'
			}, {
				iconCls : 'icon-assign-edit',
				text : '修改任务权限',
				scope : this,
				action : 'TaskAssignEdit'
			},{
				iconCls: 'icon-assign-delete',
				text : '删除任务分配',
				id: 'TaskAssignDel',
				disabled : true,
				action : 'delAssign',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '任务名称',
			dataIndex : 'taskName',
			flex : 1
		},{
			header : '任务说明',
			dataIndex : 'taskDescription',
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