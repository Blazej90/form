import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: [".next/", "node_modules/"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  { settings: { react: { version: "detect" } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    plugins: { "@next/next": pluginNext },
    rules: { ...pluginNext.configs.recommended.rules },
  },
];
