Ext.define('SauceApp.view.privileges.PrivilegesManagement', {
	extend : 'Ext.tab.Panel',
	
	xtype : 'privileges-management',
    region : 'center',
    layout : 'fit',
	items : [{
        title: '角色管理',
        items: [{
        	xtype : 'RoleList',
        	autoWidth : true,
			autoHeight : true
        }]
    },{
        title: '权限管理',
        items: [{
        	xtype : 'PermissionList',
        	autoWidth : true,
			autoHeight : true
        }]
    },{
        title: '权限分配',
        items: [{
        	xtype : 'assign-list',
        	autoWidth : true,
			autoHeight : true
        }]
    }],
	initComponent : function() {
		this.callParent(arguments);
	}
});
