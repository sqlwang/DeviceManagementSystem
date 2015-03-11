<?php

$config = [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'backend\controllers',
    'modules' => [
        'gii' => 'yii\gii\Module'
    ],
    'components' => [
     	'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'cDou5AtBrKAiOL31bb7VA9hPuAsNOkoe',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=sauce', // MySQL, MariaDB
            //'dsn' => 'pgsql:host=localhost;port=5432;dbname=mydatabase', // PostgreSQL
            'username' => 'root',
            'password' => '2881010',
            'charset' => 'utf8',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
             'enablePrettyUrl' => true,
             'enableStrictParsing'=> false,
             'rules' => [
             	'<controller:\w+>/<action:\w+>/<id:\w+>' => '<controller>/<action>',
   				'<controller:\w+>/<action:\w+>' => '<controller>/<action>',
             ]
        ],
        'user' => [
            'identityClass' => 'backend\models\User',
            'enableAutoLogin' => true,
        ],
        'session' => [
		    'class' => 'yii\web\DbSession',
		    'db' => 'db',
		    'sessionTable' => 'session',
		],
		'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ]
    ]
];



if (!YII_ENV_TEST) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = 'yii\debug\Module';

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = 'yii\gii\Module';
}

return $config;
