import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importHelpers from 'eslint-plugin-import-helpers';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended',
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-helpers': importHelpers,
      prettier: prettierPlugin, // <--- ADICIONE ESTE PLUGIN
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'error', // Agora o ESLint sabe quem manda aqui!
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* =====================
       * Regras do Onboarding (Short Functions e Limpeza)
       * ===================== */
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }], //
      complexity: ['error', 10], //
      'no-console': 'warn',

      /* =====================
       * Organização de Imports (Manual do Chefe)
       * ===================== */
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            'module', // 1. Libs externas
            '/^@application/', // 2. Infra
            '/^@features/', // 3. Negócio
            '/^@screens/', // 4. UX
            '/^@components/', // 5. UI
            '/^@types/', // 6. Contratos
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
  eslintConfigPrettier,
);
