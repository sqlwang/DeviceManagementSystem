<?php

namespace backend\models;

use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
//use yii\helpers\Security;
use yii\web\IdentityInterface;
/**
 * This is the model class for table "user".
 *
 * @property string $userid
 * @property string $username
 * @property string $password
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface
{
    public static function findIdentity($id)  
    {  
        //自动登陆时会调用  
        $temp = parent::find()->where(['user_id'=>$id])->one();  
        return isset($temp)?new static($temp):null;  
    }  
    
	public static function findByUsername($user_name)  
    {  
        return static::findOne(['username' => $user_name]); 
    }   
	  
    public static function findIdentityByAccessToken($token, $type = null)  
    {  
        return static::findOne(['password_reset_token' => $token]);  
    }  
      
    public function getId()  
    {  
        return $this->user_id;  
    }  
      
    public function getAuthKey()  
    {  
        return $this->auth_key;  
    }  
      
    public function validateAuthKey($authKey)  
    {  
        return $this->user_auth_key === $authKey;  
    }  
      
      
    public function validatePassword($password)  
    {  
        return $this->password_hash === $password;  
    }  
}
