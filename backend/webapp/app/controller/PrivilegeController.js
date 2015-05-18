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
			},
			'permission-add button[action=save]' : {
				click : this.createPermission
			}
		});
	},
	newPermission : function(button) {
		var view = Ext.create('SauceApp.view.privileges.PermissionAdd');
	},
	createPermission : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();;
       
	    if (form.isValid()) {
	        var permission = new SauceApp.model.privileges.PermissionModel(form.getValues());
	        console.log(form.getValues());
	        if ( permission.validate () ) {
	            permission.save ({
	                success : function(record, operation) {
						win.destroy();//     destroys this window
                   		var responseText = Ext.JSON.decode(operation.getResponse().responseText);
						Ext.Msg.alert('',responseText.message);
					}
	            });
	        }else{
	        	Ext.Msg.alert('','validate error');
	        }
	    }else{
	    	Ext.Msg.alert('','error');
	    }
	}
	
});

