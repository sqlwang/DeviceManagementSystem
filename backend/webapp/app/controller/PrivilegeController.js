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
			'PermissionList button[action=delPermission]' : {	
				click : this.newDeleteForm
			},
			'PermissionList' : {	
				select : function(grid, record, index, eOpts ){
					Ext.getCmp('adminPermissionDel').setDisabled(false);
					Ext.getCmp('adminPermissionDdit').setDisabled(false);
				}
			},
			'permission-add button[action=save]' : {
				click : this.createPermission
			}
		});
	},
	newPermission : function(button) {
		var view = Ext.create('SauceApp.view.privileges.PermissionAdd');
	},
	newDeleteForm : function(button) {
		Ext.MessageBox.confirm('删除确认', '您是否要删除该权限?', function(){
			var grid = button.up('grid'),
	        selectedRecords = grid.getSelection(),
	        store = grid.getStore();
	   	 	store.remove(selectedRecords);
	    	store.sync({
	    		success : function(batch) {
               		var responseText = Ext.JSON.decode( batch.operations[0].getResponse().responseText);
					Ext.Msg.alert('',responseText.message);
					Ext.getCmp('adminPermissionDdit').setDisabled(true);
					Ext.getCmp('adminPermissionDel').setDisabled(true);
				}
	    	});
		});
	},
	createPermission : function(button) {
		var win = button.up('window');
		var form = win.down('form').getForm();;
	    if (form.isValid()) {
	        var permission = new SauceApp.model.privileges.PermissionModel(form.getValues());
	        if ( permission.validate () ) {
	            permission.save ({
	                success : function(record, operation) {
						win.close();//     destroys this window
						//Ext.getCmp('PermissionList').getStore().reload();
                   		var responseText = Ext.JSON.decode(operation.getResponse().responseText);
						Ext.Msg.alert('',responseText.message);
					},
					failure : function(record, operation) {
						win.close();//     destroys this window
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

