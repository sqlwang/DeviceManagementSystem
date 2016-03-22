Ext.define('SauceApp.view.main.Main', {
    extend: 'Ext.container.Viewport',

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',
    id: 'mainView',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar shadow',
        height: 64,
        itemId: 'headerBar',
        items: [{
            xtype: 'component',
            reference: 'senchaLogo',
            cls: 'sencha-logo',
            html: '<div class="main-logo"><img src="classic/resources/images/company-logo.png" style="width:1.5em" >多度管理平台</div>',
            width: 250
        },
        {
            margin: '0 0 0 8',
            ui: 'header',
            iconCls: 'x-fa fa-navicon',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        },
        '->',
        {
            xtype: 'splitbutton',
            scale: 'medium',
            text: '账号管理',
            maxWidth: 150,
            margin: '7 0 7 10',
            cls: 'bb',
            menu: [{
                text: '修改密码',
                width: 136,
                handler: 'onChangePassword'
            }]
        },
        {
            margin: '0 0 0 10',
            iconCls: 'x-fa fa-sign-out',
            tooltip: '注销',
            handler: 'onLoginOut'
        }]
    },
    {
        xtype: 'maincontainerwrap',
        id: 'main-view-detail-wrap',
        reference: 'mainContainerWrap',
        flex: 1,
        items: [{
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            width: 250,
            expanderFirst: false,
            expanderOnly: false,
            //只有一个节点能展开
            singleExpand: true,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        },
        {
            xtype: 'container',
            flex: 1,
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            itemId: 'contentPanel',
            layout: {
                type: 'card',
                anchor: '100%'
            },
            listeners: {
                render: 'onCardViewRender'
            }
        }]
    }]
});