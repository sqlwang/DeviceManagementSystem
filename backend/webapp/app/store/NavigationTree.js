Ext.define('SauceApp.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    fields: [{
        name: 'text'
    },
    {
        name: 'type'
    }],
    root: {
        expanded: true,
        children: [{
            text: '客户管理',
            iconCls: 'x-fa fa-bank',
            expanded: true,
            children: [{
                text: '客户信息',
                viewType: 'housingPanel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            }]
        },
        {
            text: '设备管理',
            iconCls: 'x-fa fa-bank',
            expanded: true,
            children: [{
                text: '设备列表',
                viewType: 'housingPanel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            },{
                text: '配置管理',
                viewType: 'housingPanel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            },{
                text: '设备类型',
                viewType: 'housingPanel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            }]
        },
        {
            text: '升级管理',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: 'APK升级管理',
                iconCls: 'x-fa fa-check-circle-o',
                viewType: 'operationGrid',
                leaf: true
            },{
                text: '固件升级管理',
                iconCls: 'x-fa fa-check-circle-o',
                viewType: 'operationGrid',
                leaf: true
            }]
        },
        {
            text: '日志管理',
            leaf: false,
            iconCls: 'x-fa fa-user-plus',
            children: [{
                text: '日志列表',
                iconCls: 'x-fa fa-wechat',
                viewType: 'bulletinEdit',
                leaf: true
            }]
        },
        {
            text: '系统设置',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: '权限设置',
                iconCls: 'x-fa fa-check-circle-o',
                viewType: 'privileges-management',
                leaf: true
            }]
        },
        {
            text: '报表统计',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: '设备统计',
                iconCls: 'x-fa fa-check-circle-o',
                type: 'panel',
                viewType: 'operationGrid',
                leaf: true
            }]
        }]
    }
});