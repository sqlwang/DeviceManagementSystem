Ext.define('SauceApp.store.privileges.RoleStore', {
    extend: 'Ext.data.Store',
	model: 'SauceApp.model.privileges.RoleModel',
	
	proxy : {
		type : 'ajax',
		api : {
			read : '../web/index.php/privileges/role-list',
			update : '../web/index.php/privileges/role-update',
			create : '../web/index.php/privileges/role-create',
			destroy : '../web/index.php/privileges/role-delete'
		},
		reader : {
			type : 'json',
			rootProperty : 'data',
			totalProperty : 'totalCount',
			successProperty : 'success',
			idProperty : 'roleName'
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