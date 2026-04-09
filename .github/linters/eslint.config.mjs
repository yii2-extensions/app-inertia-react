import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        files: ["**/*.{js,jsx,mjs,cjs}"],
    },
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
    {
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "no-unused-vars": "off",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
        },
    },
];
