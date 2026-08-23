import { useCallback, useEffect, useState } from "react";

const getInitialTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
        return "dark";
    }

    const stored = localStorage.getItem("theme");

    if (stored === "dark" || stored === "light") {
        return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export default function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);

    const apply = useCallback((value, persist = true) => {
        setTheme(value);
        document.documentElement.classList.toggle("dark", value === "dark");

        if (persist) {
            localStorage.setItem("theme", value);
        }
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        if (stored === "dark" || stored === "light") {
            apply(stored, false);
        } else {
            apply(mediaQuery.matches ? "dark" : "light", false);
        }

        const handleSystemChange = (event) => {
            if (!localStorage.getItem("theme")) {
                apply(event.matches ? "dark" : "light", false);
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);

        return () =>
            mediaQuery.removeEventListener("change", handleSystemChange);
    }, [apply]);

    const toggle = () => apply(theme === "dark" ? "light" : "dark");
    const dark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-switch"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Use light mode" : "Use dark mode"}
            onClick={toggle}
        >
            <span className="theme-switch__label">
                {dark ? "Light" : "Dark"}
            </span>
            <span className="theme-switch__track" aria-hidden="true">
                <span
                    className={dark ? "theme-switch__thumb--dark" : undefined}
                />
            </span>
        </button>
    );
}
