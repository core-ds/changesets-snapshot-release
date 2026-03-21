/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{ts,mjs}": "eslint --fix",
  "**/package.json": "sort-package-json",
  "*.{json,md,ts,mjs,yml}": "prettier --write",
};

export default config;
