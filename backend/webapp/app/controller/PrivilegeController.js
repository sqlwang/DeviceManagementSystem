/**
 * 权限控制器
 * @author *
 * @date 2014-10-30
 */
Ext.define('SauceApp.controller.PrivilegeController', {
	extend : 'Ext.app.Controller',
	
	views : ['privileges.PrivilegesManagement','privileges.RoleList',
	'privileges.PermissionList','privileges.RoleAssignList'  ],
	models: ['privileges.RoleModel','privileges.PermissionModel'],
    stores: ['privileges.RoleStore','privileges.PermissionStore'],
	
	init : function() {
		console.log('init PrivilegeController');
	}
	
});

