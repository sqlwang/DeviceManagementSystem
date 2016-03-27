Ext.define('SauceApp.store.privileges.AssignStore', {
    extend: 'Ext.data.Store',
	model: 'SauceApp.model.privileges.AssignModel',
	
	groupField: 'roleDescription',
	proxy : {
		type : 'ajax',
		api : {
			read : '../web/index.php/privileges/assign-list',
			update : '../web/index.php/privileges/assign-update',
			create : '../web/index.php/privileges/assign-create',
			destroy : '../web/index.php/privileges/assign-delete'
		},
		reader : {
			type : 'json',
			rootProperty : 'data',
			totalProperty : 'totalCount',
			successProperty : 'success',
			idProperty : 'AssignName'
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