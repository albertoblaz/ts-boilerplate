// Native Node modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// ESLint dependencies
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
// TSLint
import tseslint from 'typescript-eslint';
// Globals for different environments
import globals from 'globals';
// Plugins
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwind from 'eslint-plugin-tailwindcss';
import compat from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flatCompat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default tseslint.config(
  {
    ignores: ['**/dist/', '**/node_modules/', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tailwind.configs['flat/recommended'],
  compat.configs["flat/recommended"],
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // needed by eslint-plugin-import to process tsconfig custom paths
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest', // needed by eslint-plugin-import to process tsconfig custom paths
        sourceType: 'module', // needed by eslint-plugin-import to process tsconfig custom paths
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // needed by eslint-plugin-import to process tsconfig custom paths
        },
      },
    },
  },
  {
    // Lint JS files without type-checking
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    }
  },
  {
    files: ['**/*.{ts,tsx,mtsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'], // Add this if you are using React 17+
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser, // globals required by eslint-plugin-react
        ...globals.jest, // globals required by vitest
        ...globals.mocha, // globals required by vitest
        ...globals.serviceworker, // globals required by eslint-plugin-react
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
      // Allow unused variables that start with an underscore
      // This is handy for unused parameters you can't omit from functions
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

      // Check for missing dependencies in additional hooks other than `useEffect`
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: 'useDeepCompareEffect',
        },
      ],

      // Don't warn when a constant (string, number, boolean, templateLiteral) is exported aside one or more components.
      // https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#allowconstantexport-v040
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Admit custom classnames other than what TailwindCSS provides
      'tailwindcss/no-custom-classname': 'off',
    },
  },
);
