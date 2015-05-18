Ext.define('SauceApp.model.privileges.PermissionModel', {
	extend : 'Ext.data.Model',
	fields : [
		{name:'PermissionName', type : 'string'}, 
		{name:'PermissionBizRule', type : 'string'},
		{name:'PermissionDescription', type : 'string'},
		{name:'sort', type : 'string'},
		{name:'ExtJSClass', type : 'string'},
		{name:'ParentPermissionName', type : 'string'}
	],
	idProperty :'PermissionName',
	proxy : {
		type : 'ajax',
		api : {
			read : '../web/index.php/privileges/permission-list',
			update : '../web/index.php/privileges/permission-create',
			create : '../web/index.php/privileges/permission-create',
			destroy : '../web/index.php/privileges/permission-delete'
		},
		reader : {
			type : 'json',
			rootProperty : 'data',
			totalProperty : 'totalCount',
			successProperty : 'success',
			idProperty : 'PermissionName'
		},
        writer: {
            type: 'json',
            writeAllFields: true,
            rootProperty: 'data'
        }
	}
}); 