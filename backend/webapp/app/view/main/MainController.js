/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SauceApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onNavigationTreeSelectionChange: function (tree, node) {
    	 /* 业务流程：当用户点击tree节点的时候，Extjs获取当前被选中的节点对象，
		 * 并在tab容器tabpanel中尝试获取对应的tab组建对象。
		 * 如果该对象不为undefined，说明该tab之前已经创建过，
		 * 则调用tab容器tabpanel.setActiveTab(tab)方法显示此tab，
		 * 如果该对象为undefined，则说明被选中节点还没有创建对应的tab，
		 * 那么就调用tab容器tabpanel的add方法传入当前被选中节点对象动态添加创建tab。
		 */
		// 获得tab容器tabpanel
		if (node && node.get('viewType')) {
            var viewType = node.get('viewType');
            var tabPanel = Ext.getCmp('maintab');
			// 获得被选中的tab组建对象
			var tab = tabPanel.getComponent(node.data.id);
			// 如果此tab还未被创建，则向tab容器添加一个tab
			if (!tab) {
				 tab = tabPanel.add({
					title : node.data.text,
					closable : true,
					autoWidth : true,
					autoHeight : true,
					active : true,// 为了兼容IE9
					layout : 'fit',
					border : false,
					items : [{
						xtype: viewType
					}]
				});
				// 将tab设置为当前可见可操作tab
				tabPanel.setActiveTab(tab);
			}else{
				alert('ok222');
			}
        }
    }
});
