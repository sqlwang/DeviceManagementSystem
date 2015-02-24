Ext.define('SauceApp.view.Doordu.LeftNav.LeftNavController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LeftNav',
    onTreeClick: function(view, selectedItem){
		 /* 业务流程：当用户点击tree节点的时候，Extjs获取当前被选中的节点对象，
		 * 并在tab容器tabpanel中尝试获取对应的tab组建对象。
		 * 如果该对象不为undefined，说明该tab之前已经创建过，
		 * 则调用tab容器tabpanel.setActiveTab(tab)方法显示此tab，
		 * 如果该对象为undefined，则说明被选中节点还没有创建对应的tab，
		 * 那么就调用tab容器tabpanel的add方法传入当前被选中节点对象动态添加创建tab。
		 * 
		 * 选项卡的内容区域的呈现方式有两种可选方案：
		 * 一是采用异步加载js文件的方式，二是采用iframe框架嵌入目标页面的方式。这里采用了第一种方式。
		 */
		// 获得tab容器tabpanel
		var tabPanel = Ext.getCmp('maintab');
		// 获得被选中的tab组建对象
		var tab = tabPanel.getComponent(selectedItem.data.id);
		// 如果此tab还未被创建，则向tab容器添加一个tab
		if (!tab) {
			if (selectedItem.data.id == 'estate_manage') {
		
			// 将tab设置为当前可见可操作tab
			tabPanel.setActiveTab(tab);
			// 其实这步是多余的，但是在IE9下，没这步就显示不正常。
			// 异步加载js并执行，参数为要加载的JS文件的URL，这个JS包含tab内容区内容的构建程序。
			// loadJS(selectedItem.data.hrefTarget);
			// 此函数为自定义函数，已在上面定义。
		}
		// 将tab设置为当前可见可操作tab
		tabPanel.setActiveTab(tab);
	}
});