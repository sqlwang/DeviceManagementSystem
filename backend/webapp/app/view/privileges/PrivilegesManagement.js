Ext.define('SauceApp.view.privileges.PrivilegesManagement', {
	extend : 'Ext.tab.Panel',
	
	xtype : 'privileges-management',
    region : 'center',
	items : [{
        title: '角色',
        items: [{
        	xtype : 'RoleList'
        }]
    },{
        title: '任务',
        items: [{
        	//xtype : 'TaskList'
        	xtype : 'panel'
        }]
    },{
        title: '操作',
        items: [{
        	//xtype : 'OperationList'
        	xtype : 'panel'
        }]
    },{
        title: '角色权限分配',
        items: [{
        	//xtype : 'RoleAssignList'
        	xtype : 'panel'
        }]
    },{
        title: '任务权限分配',
        items: [{
        //	xtype : 'TaskAssignList'
        		xtype : 'panel'
        }]
    }],
	initComponent : function() {
		this.callParent(arguments);
	}
});
