export default function ThemeToggle({ theme, onToggle }) {
    const dark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-switch"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Use light mode" : "Use dark mode"}
            onClick={onToggle}
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
