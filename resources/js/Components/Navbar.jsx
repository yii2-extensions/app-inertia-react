import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import ThemeToggle from "./ThemeToggle";

const landingLinks = [
    { href: "/#new-in-22", label: "What’s new" },
    { href: "/#stack", label: "Stack" },
    { href: "/#demo", label: "Explore" },
];

export default function Navbar() {
    const { props, url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href) =>
        url === href ||
        url.startsWith(`${href}?`) ||
        url.startsWith(`${href}/`);

    const closeMenu = () => setOpen(false);

    return (
        <header className="site-header">
            <nav className="site-nav" aria-label="Primary navigation">
                <div className="site-nav__inner">
                    <Link
                        href="/"
                        className="site-brand"
                        aria-label="Yii Framework 22.0 preview home"
                        onClick={closeMenu}
                    >
                        <img
                            src="/images/yii_logo_light.svg"
                            alt="Yii Framework"
                            className="site-brand__logo dark:hidden"
                        />
                        <img
                            src="/images/yii_logo_dark.svg"
                            alt="Yii Framework"
                            className="site-brand__logo hidden dark:block"
                        />
                        <span>22.0 preview</span>
                    </Link>

                    <div className="site-nav__desktop">
                        {landingLinks.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="site-nav__link"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                            className="site-nav__link"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Upgrade guide
                        </a>

                        <ThemeToggle />

                        {props.auth.isGuest && (
                            <Link
                                href="/user/login"
                                prefetch
                                className={`site-nav__account${
                                    isActive("/user/login")
                                        ? " site-nav__account--active"
                                        : ""
                                }`}
                            >
                                Sign in
                            </Link>
                        )}
                        {props.auth.isGuest && (
                            <Link
                                href="/user/signup"
                                prefetch
                                className="site-nav__primary"
                            >
                                Run the app
                            </Link>
                        )}

                        {props.auth.canViewUsers && (
                            <Link
                                href="/user/index"
                                prefetch
                                className="site-nav__account"
                            >
                                {props.auth.user?.username}
                            </Link>
                        )}
                        {!props.auth.isGuest && (
                            <Link
                                href="/user/logout"
                                method="post"
                                as="button"
                                className="site-nav__primary"
                            >
                                Sign out
                            </Link>
                        )}
                    </div>

                    <div className="site-nav__mobile-actions">
                        <ThemeToggle />
                        <button
                            type="button"
                            className="site-nav__menu-button"
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                            aria-label={
                                open ? "Close navigation" : "Open navigation"
                            }
                            onClick={() => setOpen((value) => !value)}
                        >
                            <span
                                className={`site-nav__menu-icon${
                                    open ? " site-nav__menu-icon--open" : ""
                                }`}
                                aria-hidden="true"
                            >
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>
                    </div>
                </div>

                {open && (
                    <div id="mobile-navigation" className="site-nav__mobile">
                        {landingLinks.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                            rel="noopener noreferrer"
                            target="_blank"
                            onClick={closeMenu}
                        >
                            Upgrade guide
                        </a>
                        {props.auth.isGuest && (
                            <Link
                                href="/user/login"
                                prefetch
                                onClick={closeMenu}
                            >
                                Sign in
                            </Link>
                        )}
                        {props.auth.isGuest && (
                            <Link
                                href="/user/signup"
                                prefetch
                                className="site-nav__mobile-primary"
                                onClick={closeMenu}
                            >
                                Run the app
                            </Link>
                        )}
                        {props.auth.canViewUsers && (
                            <Link
                                href="/user/index"
                                prefetch
                                onClick={closeMenu}
                            >
                                User console
                            </Link>
                        )}
                        {!props.auth.isGuest && (
                            <Link
                                href="/user/logout"
                                method="post"
                                as="button"
                                className="site-nav__mobile-logout"
                                onClick={closeMenu}
                            >
                                Sign out
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}
