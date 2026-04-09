import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/Components/ui/button";

/**
 * Cycles between light and dark theme, persisting the choice in `localStorage`.
 *
 * Honors the user's `prefers-color-scheme` until they pick an explicit value.
 */
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

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

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

    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [apply]);

  const toggle = () => apply(theme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="text-muted-foreground hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
