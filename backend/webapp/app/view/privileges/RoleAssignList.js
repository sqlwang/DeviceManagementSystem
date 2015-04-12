Ext.define('SauceApp.view.privileges.RoleAssignList', {
	extend : 'Ext.grid.Panel',
	
	xtype : 'assign-list',
	loadMask: true,
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
	initComponent : function() {
		var me = this;
		me.store = Ext.create('SauceApp.store.privileges.AssignStore');
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
		
//		{name: 'roleName', type: 'string'},
//		{name: 'roleDescription', type: 'string'},
//		{name: 'permissionDescription', type: 'string'},
//		{name: 'permission', type: 'string'},
//		{name: 'data', type: 'string'},
//		{name: 'rule', type: 'string'}
        this.columns= [{
            text: '权限分配',
            width: 300,
            locked: true,
            tdCls: 'task',
            sortable: true,
            dataIndex: 'permissionDescription',
            hideable: false
        }, {
            header: '权限代码',
            width: 130,
            dataIndex: 'permission'
        }, {
            header: 'JS类名',
            width: 130,
            dataIndex: 'permission'
        }, {
            header: '排序',
            width: 130,
            dataIndex: 'data'
        }, {
            header: '规则',
            width: 130,
            dataIndex: 'rule'
        }, {
            header: '描述',
            width: 130,
            dataIndex: 'data'
        }];
		this.callParent(arguments);
		me.store.load(); 
	}
}); 