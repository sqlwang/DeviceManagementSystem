Ext.define('SauceApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    onLoginClick : function(button) {
		var loginWin = button.up('window');
		var loginForm = loginWin.down('form');
		if (loginForm.getForm().isValid()) {
			var values = loginForm.getValues();
			var ok;
			loginForm.submit({
				url : '../web/index.php/site/login',
				method : 'POST',
				scope : this,
				success : function(form, action) {
					// Remove Login Window
			        this.getView().destroy();
			        // Add the main view to the viewport
			       	Ext.widget('app-main');
				},
				failure : function(form, action) {
					var lblField = Ext.getCmp('msgField');
					if (lblField) {
						switch (action.failureType) {
							case Ext.form.action.Action.SERVER_INVALID :
								lblField.setText(action.result.msg || "账号或密码错误", false);
						}
					}
				}
			});

		}
	},
	OnCreateUser:function(button){
		var createWin = button.up('window');
		var createForm = createWin.down('form');
		if (createForm.getForm().isValid()) {
			var values = createForm.getValues();
			var ok;
			createForm.submit({
				url : '../web/index.php/site/create-admin',
				method : 'POST',
				scope : this,
				success : function(form, action) {
					// Remove Login Window
			        this.getView().destroy();
			        // Add the main view to the viewport
			       	Ext.widget('login');
				},
				failure : function(form, action) {
					var lblField = Ext.getCmp('msgField');
					if (lblField) {
						switch (action.failureType) {
							case Ext.form.action.Action.SERVER_INVALID :
								lblField.setText(action.result.message || "账号或密码错误", false);
						}
					}
				}
			});
		}
	}
	
});