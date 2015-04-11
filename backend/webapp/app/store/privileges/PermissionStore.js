Ext.define('SauceApp.store.privileges.PermissionStore', {
    extend: 'Ext.data.Store',
	model: 'SauceApp.model.privileges.PermissionModel',

	proxy : {
		type : 'ajax',
		api : {
			read : '../web/index.php/privileges/permission-list',
			update : '../web/index.php/privileges/permission-update',
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
            writeAllFields: false,
            rootProperty: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.OK,
                    buttons: Ext.Msg.OK
                });
            }
        }
	},
	pageSize: 10,
	autoLoad: false,
	autoDestroy: true
});