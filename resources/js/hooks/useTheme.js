import { useCallback, useEffect, useState } from "react";

const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

const getStoredTheme = () => {
    const stored = localStorage.getItem("theme");

    return stored === "dark" || stored === "light" ? stored : null;
};

const getInitialTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
        return "dark";
    }

    return (
        getStoredTheme() ??
        (window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light")
    );
};

export function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    const applyTheme = useCallback((value, persist = true) => {
        setTheme(value);
        document.documentElement.classList.toggle("dark", value === "dark");

        if (persist) {
            localStorage.setItem("theme", value);
        }
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
        const stored = getStoredTheme();

        applyTheme(
            stored ?? (mediaQuery.matches ? "dark" : "light"),
            false,
        );

        const handleSystemThemeChange = (event) => {
            if (!getStoredTheme()) {
                applyTheme(event.matches ? "dark" : "light", false);
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        return () =>
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, [applyTheme]);

    const toggleTheme = useCallback(() => {
        applyTheme(theme === "dark" ? "light" : "dark");
    }, [applyTheme, theme]);

    return { theme, toggleTheme };
}
