Ext.define('SauceApp.view.privileges.PermissionList', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.PermissionList',
	
	id: 'PermissionList',
    reserveScrollbar: true,
    loadMask: true,
    useArrows: true,
    rootVisible: false,
    animate: false,
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
				id: 'adminPermissionDdit',
				scope : this,
				disabled : true,
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
			xtype: 'treecolumn', //this is so we know which column will show the tree
			dataIndex : 'PermissionDescription',
			text: '权限描述',
            width: 275,
            sortable: true,
            locked: true
		},{
			text : '权限代码',
			dataIndex : 'PermissionName',
			flex : 1
		},{
			text : '导航栏排序',
			dataIndex : 'sort',
			flex : 1
		},{
			text : 'ExtJS类名',
			dataIndex : 'ExtJSClass',
			flex : 1
		},{
			text : '父级权限名称',
			dataIndex : 'ParentPermissionName',
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