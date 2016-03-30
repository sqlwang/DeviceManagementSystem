/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('SauceApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'SauceApp',

    stores: [
        // TODO: add global / shared stores here
        'NavigationTree'
        
    ],
    views:[
    	'login.Login',
        'login.CreateUser'
    ],
    
    launch: function () {
        // TODO - Launch the application
       	var supportsLocalStorage = Ext.supports.LocalStorage, 
        loggedIn;

        if (!supportsLocalStorage) {
            // Alert the user if the browser does not support localStorage
            Ext.Msg.alert('Your Browser Does Not Support Local Storage');
            return;
        }

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("TutorialLoggedIn");
        Ext.Ajax.request({
			url : '../web/index.php/site/islogged', 
			method : 'POST',
			scope : this,
			success : function(result, request) {
				var retorno = Ext.decode(result.responseText);
				if(retorno.success) {
					Ext.widget('app-main');
				} else {
					if(retorno.data.exist_admin){
						Ext.widget('login');
					}else{
						Ext.widget('create-user');
					}
				}
			},
			failure : function(result, request) {
				switch (result.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.MessageBox.alert('Erro', "Campos inv&#225;lidos");
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.MessageBox.alert('Erro', "Falha ao conectar no servidor");
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						this.onAuthenticationFail(sender);
				}
			}
		});
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
