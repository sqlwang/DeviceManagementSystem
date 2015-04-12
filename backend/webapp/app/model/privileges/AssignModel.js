Ext.define('SauceApp.model.privileges.AssignModel', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'roleName', type: 'string'},
		{name: 'roleDescription', type: 'string'},
		{name: 'permissionDescription', type: 'string'},
		{name: 'permission', type: 'string'},
		{name: 'data', type: 'string'},
		{name: 'rule', type: 'string'}
	],
	idProperty: 'roleName'
	
}); 
