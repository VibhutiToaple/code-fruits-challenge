// ESLint Flat Config for React + TypeScript + Prettier
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  files: ["**/*.{js,jsx,ts,tsx}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      //project: "./tsconfig.json",
    },
  },
  plugins: {
    react,
    "react-hooks": hooks,
    prettier,
  },
  settings: {
    react: { version: "detect" },
  },
  rules: {
    ...react.configs.recommended.rules,
    ...hooks.configs.recommended.rules,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignores: ["node_modules", "dist", "build", "coverage", "eslint.config.js"],
});
