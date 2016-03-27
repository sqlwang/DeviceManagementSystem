Ext.define('SauceApp.model.privileges.PermissionModel', {
	extend : 'Ext.data.TreeModel',
	fields : [
		{name:'id', type : 'string'}, 
		{name:'text', type : 'string'}, 
		{name:'PermissionName', type : 'string'}, 
		{name:'PermissionBizRule', type : 'string'},
		{name:'PermissionDescription', type : 'string'},
		{name:'sort', type : 'string'},
		{name:'ExtJSClass', type : 'string'},
		{name:'ParentPermissionName', type : 'string'}
	]
}); 