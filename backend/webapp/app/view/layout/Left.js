Ext.define('SauceApp.view.layout.Left' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.layoutleft',
	region: 'west',
	split: true,
	requires: [ 'SauceApp.view.LeftNav.NavTree'],
    items: [{
    	xtype: 'NavTree'
    }],
    
    initComponent: function() {
        this.callParent(arguments);
    }
});

