// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs", "scripts/*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
    },
  },
  {
    ignores: [".yarn/*"],
  }
);
