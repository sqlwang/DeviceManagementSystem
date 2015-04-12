/**
 * 权限控制器
 * @author *
 * @date 2014-10-30
 */
Ext.define('SauceApp.controller.PrivilegeController', {
	extend : 'Ext.app.Controller',
	
	views : ['privileges.PrivilegesManagement','privileges.RoleList',
	'privileges.PermissionList','privileges.RoleAssignList',
	'privileges.PermissionAdd'],
	models: ['privileges.RoleModel','privileges.PermissionModel','privileges.AssignModel'],
    stores: ['privileges.RoleStore','privileges.PermissionStore','privileges.AssignStore'],
	
	init : function() {
		console.log('init PrivilegeController');
		this.control({
			'PermissionList button[action=addPermission]' : {	
				click : this.newPermission
			}
		});
	},
	newPermission : function(button) {
		var view = Ext.create('SauceApp.view.privileges.PermissionAdd');
	}
	
});

