const year = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__brand">
                    <a
                        href="https://www.yiiframework.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Yii Framework website"
                    >
                        <img
                            src="/images/yii_logo_light.svg"
                            alt="Yii Framework"
                            className="dark:hidden"
                        />
                        <img
                            src="/images/yii_logo_dark.svg"
                            alt="Yii Framework"
                            className="hidden dark:block"
                        />
                    </a>
                    <p>
                        A working Yii 22 + Inertia + React reference for the
                        framework&apos;s next development line.
                    </p>
                </div>

                <div className="site-footer__links" aria-label="Project links">
                    <a
                        href="https://github.com/yiisoft/yii2/tree/22.0"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Branch 22.0
                    </a>
                    <a
                        href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Upgrade guide
                    </a>
                    <a
                        href="https://github.com/yii2-extensions/app-inertia-react"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Application source
                    </a>
                </div>

                <div className="site-footer__status">
                    <span>
                        <i aria-hidden="true" /> Development preview
                    </span>
                    <small>&copy; {year} Terabytesoftw · BSD-3-Clause</small>
                </div>
            </div>
        </footer>
    );
}
