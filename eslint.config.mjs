import jsEslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'eslint.config.mjs', 'jest.config.js', '**/*.d.ts', '**/*.test.ts'],
  },
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  prettierPluginRecommended,
  {
    files: ['**/*.{ts,mts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tsEslint.parser,
        project: './tsconfig.json',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        browser: true,
        es2021: true,
      },
    },
  },
]
