Ext.define('Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'projectId', type: 'int'},
        {name: 'project', type: 'string'},
        {name: 'taskId', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'estimate', type: 'float'},
        {name: 'rate', type: 'float'},
        {name: 'due', type: 'date', dateFormat:'m/d/Y'}
    ]
});

Ext.define('SauceApp.view.privileges.RoleAssignList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.RoleAssignList',
	loadMask: true,
	id: 'adminRoleAssignList',
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
	initComponent : function() {
		var me = this;
		var data = [
		    {projectId: 100, project: '管理员', taskId: 112, description: '权限管理', estimate: 6, rate: 150, due:'06/24/2007'},
		    {projectId: 100, project: '管理员', taskId: 113, description: '设备管理', estimate: 4, rate: 150, due:'06/25/2007'},
		    {projectId: 100, project: '管理员', taskId: 114, description: '用户管理', estimate: 4, rate: 150, due:'06/27/2007'},
		    {projectId: 100, project: '管理员', taskId: 115, description: '系统日志', estimate: 8, rate: 0, due:'06/29/2007'}
		];

		var store = Ext.create('Ext.data.Store', {
	        model: 'Task',
	        data: data,
	        sorters: {property: 'due', direction: 'ASC'},
	        groupField: 'project'
	    });
	    this.store = store;
//		this.dockedItems = [{
//			xtype : 'toolbar',
//			//dock: 'bottom',
//			items : [{
//				iconCls: 'icon-assign-add',
//				text : '分配角色权限',
//				scope : this,
//				action : 'adminRoleAddAssign'
//			},{
//				iconCls: 'icon-assign-delete',
//				text : '删除角色分配',
//				id: 'adminRoleAssignDel',
//				disabled : true,
//				action : 'RoleAssignDel',
//				scope : this
//			}]
//		}];	
			
        this.dockedItems= [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Toggle the visibility of the summary row',
                text: 'Toggle Summary',
                enableToggle: true,
                pressed: true,
                handler: function() {
                    me.grid.lockedGrid.getView().getFeature('group').toggleSummaryRow(true);
                }
            }]
        }];
        this.columns= [{
            text: '角色',
            width: 300,
            locked: true,
            tdCls: 'task',
            sortable: true,
            dataIndex: 'description',
            hideable: false,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
            }
        }, {
            header: '权限名称',
            width: 180,
            sortable: true,
            dataIndex: 'project'
        }, {
            header: '排序',
            width: 130,
            sortable: true,
            dataIndex: 'due',
            summaryType: 'max',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            summaryRenderer: Ext.util.Format.dateRenderer('m/d/Y'),
            field: {
                xtype: 'datefield'
            }
        }, {
            header: 'JS类名',
            width: 130,
            sortable: true,
            dataIndex: 'estimate',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return value + ' hours';
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return value + ' hours';
            },
            field: {
                xtype: 'numberfield'
            }
        }, {
            header: '规则',
            width: 130,
            sortable: true,
            renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            dataIndex: 'rate',
            summaryType: 'average',
            field: {
                xtype: 'numberfield'
            }
        }, {
            header: '描述',
            width: 130,
            sortable: false,
            groupable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                return Ext.util.Format.usMoney(record.get('estimate') * record.get('rate'));
            },
            summaryType: function(records, values) {
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total += record.get('estimate') * record.get('rate');
                }
                return total;
            },
            summaryRenderer: Ext.util.Format.usMoney
        }];
		this.callParent(arguments);
	}
}); 