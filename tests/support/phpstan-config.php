<?php

declare(strict_types=1);

use app\models\User;
use yii\caching\FileCache;
use yii\inertia\Manager;
use yii\inertia\Vite;
use yii\log\FileTarget;
use yii\symfonymailer\Mailer;
use yii\web\{Application, Request, UrlManager};

return [
    'id' => 'app-inertia-react-phpstan',
    'phpstan' => [
        'application_type' => Application::class,
    ],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm' => dirname(__DIR__, 2) . '/node_modules',
    ],
    'basePath' => dirname(__DIR__, 2),
    'controllerNamespace' => 'app\\controllers',
    'components' => [
        'cache' => [
            'class' => FileCache::class,
        ],
        'inertia' => [
            'class' => Manager::class,
        ],
        'inertiaReact' => [
            'class' => Vite::class,
        ],
        'log' => [
            'targets' => [
                [
                    'class' => FileTarget::class,
                    'levels' => [
                        'error',
                        'warning',
                    ],
                ],
            ],
        ],
        'mailer' => [
            'class' => Mailer::class,
            'useFileTransport' => true,
        ],
        'request' => [
            'class' => Request::class,
        ],
        'urlManager' => [
            'class' => UrlManager::class,
        ],
        'user' => [
            'identityClass' => User::class,
        ],
    ],
    'params' => require dirname(__DIR__, 2) . '/config/params.php',
];
