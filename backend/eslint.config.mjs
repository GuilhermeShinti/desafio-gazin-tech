import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.js"], 
        languageOptions: {sourceType: "commonjs"},
        rules: {
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_|next" }],
            "no-undef": "error",
            "no-useless-catch": "error",
            "indent": ["error", 4]
        },
    },
    {
        languageOptions: { globals: {
            ...globals.node,
            ...globals.jest
        } }
    },

    pluginJs.configs.recommended,
];