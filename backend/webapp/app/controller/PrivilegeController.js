/**
 * 权限控制器
 * @author *
 * @date 2014-10-30
 */
Ext.define('SauceApp.controller.PrivilegeController', {
	extend : 'Ext.app.Controller',
	views : ['privileges.PrivilegesManagement','privileges.RoleList' ],
	init : function() {
		console.log('init PrivilegeController');
	}
	
});
