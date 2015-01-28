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
				url : 'index.php/Site/Login'//Simula OK
				,
				method : 'POST',
				scope : this,
				success : function(form, action) {
					// Remove Login Window
			        this.getView().destroy();
			        // Add the main view to the viewport
			       	Ext.widget('app-main');
			       	
			       	if(action.result.data.is_operator_manage){
						Ext.getCmp('operator_manage_privilege').setDisabled(false);
						Ext.getCmp('operator_manage_privilege').setHidden(false);
					}
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
	}
});