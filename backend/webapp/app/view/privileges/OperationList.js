Ext.define('SauceApp.view.Admin.Privileges.OperationList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.OperationList',
	loadMask: true,
	id: 'adminOperationList',
	store: 'Admin.OperationStore',
	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-operation-add',
				text : '添加操作',
				scope : this,
				action : 'addOperation'
			}, {
				iconCls : 'icon-operation-edit',
				text : '修改操作',
				scope : this,
				action : 'editOperation'
			},{
				iconCls: 'icon-operation-delete',
				text : '删除操作',
				id: 'adminOperationDel',
				disabled : true,
				action : 'delOperation',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '操作名称',
			dataIndex : 'operationName',
			flex : 1
		},{
			header : '业务规则',
			dataIndex : 'operationBizRule',
			flex : 1
		},{
			header : '数据字典',
			dataIndex : 'operationData',
			flex : 1
		},{
			header : '描述',
			dataIndex : 'operationDescription',
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