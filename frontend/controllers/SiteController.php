<?php
namespace frontend\controllers;

use Yii;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use frontend\lib\Response;

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
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
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
		// if(!Yii::app()->user->isGuest){
			// $res->success = true;
       	 	// $res->message = '';
       		// $res->data = array(
				// 'id' => Yii::app()->user->id,
				// 'name' => Yii::app()->user->userName,
			// );
		// }else{
			// $res->success = false;
       	 	// $res->message = '';
       		// $res->data = array();
		// }
		$res->success = false;
       	$res->message = '';
       	$res->data = array();
		echo $res->to_json();
	}
	
	/**
	 * 系统初始化，创建管理员
	 * 
	 * */
	 public function actionCreateUser(){
	 	$params =Yii::$app->request->post("CreateUser");
		$user = empty($params['username']) ? '' : $params['username'];
		$pwd = empty($params['password']) ? '' : $params['password'];
		$confirm_pwd = empty($params['confirmPassword']) ? '' : $params['confirmPassword'];
		$res = new Response();
		if ($pwd != $confirm_pwd) {
			$res->success = false;
       		$res->message = '两次密码输入不一样';
       		$res->data = array();
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
