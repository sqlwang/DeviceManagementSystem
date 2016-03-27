Ext.define('SauceApp.model.privileges.RoleModel', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'roleName', type: 'string'},
		{name: 'roleBizRule', type: 'string'},
		{name: 'roleData', type: 'string'},
		{name: 'roleDescription', type: 'string'},
		{name: 'parentRoleName', type: 'string'}
	],
	idProperty :'roleName'
	
}); 