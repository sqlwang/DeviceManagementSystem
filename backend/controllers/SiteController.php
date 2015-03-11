<?php
namespace backend\controllers;

use Yii;
use backend\models\LoginForm;
use backend\models\User;
use common\lib\Response;

use yii\web\Session;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
//use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * Site controller
 */
class SiteController extends Controller
{
	 public $enableCsrfValidation = false;
    /**
     * @inheritdoc
     */
    // public function behaviors()
    // {
        // return [
            // 'access' => [
                // 'class' => AccessControl::className(),
                // 'only' => ['logout', 'signup'],
                // 'rules' => [
                    // [
                        // 'actions' => ['signup'],
                        // 'allow' => true,
                        // 'roles' => ['?'],
                    // ],
                    // [
                        // 'actions' => ['logout'],
                        // 'allow' => true,
                        // 'roles' => ['@'],
                    // ],
                // ],
            // ],
            // 'verbs' => [
                // 'class' => VerbFilter::className(),
                // 'actions' => [
                    // 'logout' => ['post'],
                // ],
            // ],
        // ];
    // }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null
            ]
        ];
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogin()
    {
        // if (!Yii::$app->user->isGuest) {
            // return $this->goHome();
        // }
		$res = new Response();
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
        	
        	$res->success = true;
       	 	$res->message = '登录成功';
        } else {
        	$res->success = false;
       	 	$res->message = '登录失败';
        }
		$res->to_json();
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
	 * 判断用户是否登录
	 */
	public function actionIslogged()
	{
		$res = new Response();
		//如果没有管理员存在，初始化管理员
		$exist_admin = User::find()->all();
		if (empty($exist_admin)) {
			$res->data = array(
				'exist_admin' => false
			);
			$res->success = false;
       	 	$res->message = '';
			$res->to_json();
		}else{
			if(Yii::$app->user->getId()){
				$res->success = true;
	       	 	$res->message = '';
	       		$res->data = array(
					//'id' => Yii::app()->user->getId(),
					'exist_admin' => true
					//'name' => Yii::app()->user->userName,
				);
			}else{
				$res->success = false;
	       	 	$res->message = '';
	       		$res->data = array(
					'exist_admin' => true
				);
			}
		}
		$res->to_json();
	}
	
	/**
	 * 系统初始化，创建管理员
	 * 
	 * */
	 public function actionCreateAdmin(){
	 	$params =Yii::$app->request->post("CreateUser");
		$user_name = empty($params['username']) ? '' : $params['username'];
		$pwd = empty($params['password']) ? '' : $params['password'];
		$confirm_pwd = empty($params['confirmPassword']) ? '' : $params['confirmPassword'];
		$email = empty($params['email']) ? '' : $params['email'];
		
		$res = new Response();
		if ($pwd != $confirm_pwd) {
			$res->success = false;
       		$res->message = '两次密码输入不一样';
		}
		
		$is_user = User::find()->all();
		//判断是否创建过管理员帐号
		if (!empty($is_user)) {
			$res->success = false;
       		$res->message = '该系统已经创建过测试帐号';
		} 
		$user = new User;
		$user->username = $user_name;
		$user->password_hash = $pwd;
		$user->email = $email;
		if ($user->validate() && $user->save()) {
			$res->success = true;
       		$res->message = '创建系统管理员成功';
			//为超级管理员授权
			$auth = Yii::$app->authManager;
			$role = $auth ->createRole('admin') ;
			$updateOwnPost = $this->auth->createPermission('updateOwnPost');
			$updateOwnPost->description = 'Update own post';
			$updateOwnPost->ruleName = $rule->name;
			$auth->add($updateOwnPost);
			var_dump($role);
			exit;
			
			if(!$auth->assign( $role, $user->user_id)){
				$res->success = false;
       			$res->message = '创建系统管理员权限失败';
			}
		} else {
			$res->success = false;
       		$res->message = '创建系统管理员失败';
		}
		$res->to_json();
	 }

    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->getSession()->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->getSession()->setFlash('error', 'Sorry, we are unable to reset password for email provided.');
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->getSession()->setFlash('success', 'New password was saved.');

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }
}
