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
                type: 'panel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            }]
        },
        {
            text: '设备管理',
            iconCls: 'x-fa fa-bank',
            expanded: true,
            children: [{
                text: '房屋资源',
                viewType: 'housingPanel',
                type: 'panel',
                leaf: true,
                iconCls: 'x-fa fa-building'
            }]
        },
        {
            text: '配置管理',
            leaf: false,
            iconCls: 'x-fa fa-expeditedssl',
            children: [{
                text: '门禁主机',
                iconCls: 'x-fa fa-calculator',
                type: 'panel',
                viewType: 'bulletinEdit',
                leaf: true
            },
            {
                text: '门禁卡',
                iconCls: 'x-fa fa-list-alt',
                type: 'panel',
                viewType: 'cardGrid',
                leaf: true
            }]
        },
        {
            text: '日志管理',
            leaf: false,
            iconCls: 'x-fa fa-user-plus',
            children: [{
                text: '信息公告',
                iconCls: 'x-fa fa-wechat',
                type: 'panel',
                viewType: 'bulletinEdit',
                leaf: true
            }]
        },
        {
            text: '固件管理',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: '在线设备管理',
                iconCls: 'x-fa fa-check-circle-o',
                type: 'panel',
                viewType: 'operationGrid',
                leaf: true
            }]
        },
        {
            text: '系统设置',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: '办理记录',
                iconCls: 'x-fa fa-check-circle-o',
                type: 'panel',
                viewType: 'operationGrid',
                leaf: true
            }]
        },
        {
            text: '报表统计',
            leaf: false,
            iconCls: 'x-fa fa-skyatlas',
            children: [{
                text: '人口统计',
                iconCls: 'x-fa fa-check-circle-o',
                type: 'panel',
                viewType: 'operationGrid',
                leaf: true
            }]
        }]
    }
});