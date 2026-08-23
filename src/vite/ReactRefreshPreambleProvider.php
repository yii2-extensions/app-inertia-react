<?php

declare(strict_types=1);

namespace app\vite;

use PHPForge\Vite\Asset\InlineModule;
use PHPForge\Vite\Development\InlineModuleProviderInterface;

use function json_encode;
use function sprintf;

use const JSON_THROW_ON_ERROR;

/**
 * Provides the application-owned React Refresh preamble documented by Vite.
 */
final readonly class ReactRefreshPreambleProvider implements InlineModuleProviderInterface
{
    public function provide(string $devServerUrl): InlineModule
    {
        return new InlineModule(
            sprintf(
                <<<'JAVASCRIPT'
                import RefreshRuntime from %s;
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
                JAVASCRIPT,
                json_encode($devServerUrl . '/@react-refresh', JSON_THROW_ON_ERROR),
            ),
        );
    }
}
