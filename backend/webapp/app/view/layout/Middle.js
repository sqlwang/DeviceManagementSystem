Ext.define('SauceApp.view.layout.Middle', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.layoutmiddle',
	region : 'center',
	layout : 'fit',
    plain: true,
    items: [{
    	xtype: 'maintab'
    }],

	initComponent : function() {
		this.callParent(arguments);
	}
}); 

Ext.define('SauceApp.view.Doordu.MidTab.MainTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'maintab',
    id: "maintab",
    width: 400,
    height: 400,
    items: [{
        title: 'Home',
        html: 'Home',
        itemId: 'home'
    }]    
});