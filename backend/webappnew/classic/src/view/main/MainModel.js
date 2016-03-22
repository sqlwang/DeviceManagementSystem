Ext.define('SauceApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    stores: {
        views: {
            type: 'views'
        },
        areaProvincesStore: {
            type: 'areaProvinces'
        },
        areaDistrictStore: {
            type: 'areaDistrict'
        },
        //��
        areaCityStore: {
            type: 'areaCity'
        },
        //������
        agentTreeStore: {
            type: 'agentTree'
        }
    }
});