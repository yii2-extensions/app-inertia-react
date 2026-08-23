<?php

declare(strict_types=1);

use app\models\User;
use app\vite\ReactRefreshPreambleProvider;
use PHPForge\Vite\Configuration\DevelopmentConfiguration;
use PHPForge\Vite\Vite;
use yii\caching\FileCache;
use yii\inertia\Manager;
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
            '__construct()' => [
                'configuration' => new DevelopmentConfiguration(
                    devServerUrl: 'http://localhost:5173',
                    inlineModuleProviders: [new ReactRefreshPreambleProvider()],
                ),
                'entrypoints' => ['resources/js/app.jsx'],
            ],
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
