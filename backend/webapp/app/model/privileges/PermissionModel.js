Ext.define('SauceApp.model.privileges.PermissionModel', {
	extend : 'Ext.data.Model',
	fields : [
		{name:'PermissionName', type : 'string'}, 
		{name:'PermissionBizRule', type : 'string'},
		{name:'PermissionDescription', type : 'string'},
		{name:'PermissionData', type : 'string'}
	],
	idProperty :'PermissionName'
}); 