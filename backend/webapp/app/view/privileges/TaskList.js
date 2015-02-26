Ext.define('SauceApp.view.Admin.Privileges.TaskList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.TaskList',
	loadMask: true,
	id: 'adminTaskList',
	store: 'Admin.TaskStore',
	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			//dock: 'bottom',
			items : [{
				iconCls: 'icon-task-add',
				text : '添加任务',
				scope : this,
				action : 'addTask'
			}, {
				iconCls : 'icon-task-edit',
				text : '修改任务',
				scope : this,
				action : 'editTask'
			},{
				iconCls: 'icon-task-delete',
				text : '删除任务',
				id: 'adminTaskDel',
				disabled : true,
				action : 'delTask',
				scope : this
			}]
		}];	
			
		this.columns = [{
			header : '任务名称',
			dataIndex : 'taskName',
			flex : 1
		},{
			header : '业务规则',
			dataIndex : 'taskBizRule',
			flex : 1
		},{
			header : '数据字典',
			dataIndex : 'taskData',
			flex : 1
		},{
			header : '描述',
			dataIndex : 'taskDescription',
			flex : 1
		}];

		this.bbar = new Ext.PagingToolbar({
			store : this.store,
			displayInfo : true,
			pageSize : 10
		});
		this.callParent();
	}
}); 