
Ext.define('SauceApp.view.device.type.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'SauceApp.view.device.type.GridController',
        'SauceApp.view.device.type.GridModel'
    ],
	xtype: 'deviceTypeGrid',
    controller: 'device-type-grid',
    viewModel: {
        type: 'device-type-grid'
    },

    margin: 15,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE'
    },
    columns: [
    {
        text: '类型名称',
        width: 300,
        dataIndex: 'house_address'
    },
    {
        text: '类型标识符',
        width: 250,
        dataIndex: 'phone_no'
    },
    {
        text: '创建时间',
        dataIndex: 'valid_time'
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        defaults: {
            xtype: 'button'
        },
        items: [{
            text: '新增设备类型',
            handler: 'onAddClick'
        },{
            text: '修改设备类型',
            handler: 'onEditClick'
        },{
            text: '删除设备类型',
            handler: 'onDelClick'
        }]
    },
    {
    	dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind: '{device-type-grid}'
    }]
});



/*************添加设备类型***************/
Ext.define('SauceApp.view.device.type.addDeviceType', {
	extend : 'Ext.window.Window',
	alias : 'widget.addDeviceType',
	xtype : 'addDeviceType',
	autoShow : true,
	title : '添加类型',
	closable : true,
	closeAction : 'destory',
	width : 460,
	minWidth : 460,
	modal:true,
	initComponent : function() {
		this.items = [{
			xtype : 'form',
			margin: '5 5 5 5',
			waitMsgTarget : true,
			items : [{
                xtype:'textfield',
                fieldLabel : '类型名称',
                width : 430,
                labelWidth : 120
            },{
                xtype:'textfield',
                fieldLabel : '类型标识符',
                width : 430,
                labelWidth : 120
            }],
			buttons : [{
				text : '保存',
				action : 'save'

			}, {
				text : '取消',
				scope : this,
				handler : this.close
			}]
		}];
		this.callParent(arguments);
	}
});