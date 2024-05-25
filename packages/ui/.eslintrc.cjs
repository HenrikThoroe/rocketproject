/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['vite.config.js', 'tailwind.config.ts'],
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
}
