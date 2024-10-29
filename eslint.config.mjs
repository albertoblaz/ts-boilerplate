import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwind from 'eslint-plugin-tailwindcss';
import compat from 'eslint-plugin-compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flatCompat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default tseslint.config(
  {
    ignores: [
      '**/dist/',
      '**/node_modules/',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/typings/',
      'tsconfig.json',
      'eslint.config.mjs',
      'vite.config.ts',
      'vitest.setup.ts'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tailwind.configs['flat/recommended'],
  compat.configs["flat/recommended"],
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  {
    // Parse only JS files without type-checking at the project root or in scripts folder
    files: ['*.js', 'scripts/**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    }
  },
  {
    files: ['**/*.{ts,tsx,mtsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.mocha,
        ...globals.serviceworker,
      },
    },
  },
  /*
   * 'eslint-plugin-react-hooks' doesn't support ESLint's "Flat Config"
   * so we need to patch the config using @eslint/compat and @eslint/eslintrc as below
   */
  ...fixupConfigRules(
    flatCompat.extends(
      'plugin:react-hooks/recommended',
    )
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-empty': 'off',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-namespace-keyword': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 'import/no-duplicates': 'error', // coming from "eslint-plugin-import" which does not support yet ESLint v9
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: 'useDeepCompareEffect',
        },
      ],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'tailwindcss/no-custom-classname': 'off',
    },
  },
);
