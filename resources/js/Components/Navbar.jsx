import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

const landingLinks = [
    { href: "/#new-in-22", label: "What’s new" },
    { href: "/#stack", label: "Stack" },
    { href: "/#demo", label: "Explore" },
];

export default function Navbar() {
    const { props, url } = usePage();
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const isActive = (href) =>
        url === href ||
        url.startsWith(`${href}?`) ||
        url.startsWith(`${href}/`);

    const closeMenu = () => setOpen(false);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

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
                            alt=""
                            className="site-brand__logo dark:hidden"
                        />
                        <img
                            src="/images/yii_logo_dark.svg"
                            alt=""
                            className="site-brand__logo hidden dark:block"
                        />
                        <span>22.0 preview</span>
                    </Link>

                    <div className="site-nav__desktop">
                        {landingLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="site-nav__link"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a
                            href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                            className="site-nav__link"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Upgrade guide
                        </a>

                        <ThemeToggle
                            theme={theme}
                            onToggle={toggleTheme}
                        />

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
                        <ThemeToggle
                            theme={theme}
                            onToggle={toggleTheme}
                        />
                        <button
                            type="button"
                            className="site-nav__menu-button"
                            aria-expanded={open}
                            aria-controls={
                                open ? "mobile-navigation" : undefined
                            }
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
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
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
