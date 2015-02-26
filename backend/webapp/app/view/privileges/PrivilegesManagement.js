Ext.define('SauceApp.view.Admin.Privileges.PrivilegesManagement', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.PrivilegesManagement',
    region : 'center',
	items : [{
        title: '角色',
        items: [{
        	xtype : 'RoleList'
        }]
    },{
        title: '任务',
        items: [{
        	xtype : 'TaskList'
        }]
    },{
        title: '操作',
        items: [{
        	xtype : 'OperationList'
        }]
    },{
        title: '角色权限分配',
        items: [{
        	xtype : 'RoleAssignList'
        }]
    },{
        title: '任务权限分配',
        items: [{
        	xtype : 'TaskAssignList'
        }]
    }],
	initComponent : function() {
		this.callParent(arguments);
	}
});
