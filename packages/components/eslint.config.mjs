import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['node_modules', 'es', 'lib', 'bin', '.prettierignore', '.prettierrc.cjs']
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.amd
      },

      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        jsxPragma: 'React',

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'no-var': 'error',
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1
        }
      ],
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'error',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/require-default-prop': 'off',
      'vue/valid-attribute-name': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-empty': [
        1,
        {
          allowEmptyCatch: true
        }
      ],
      'no-prototype-builtins': 'off',
      'vue/no-v-for-template-key': 'off'
    }
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue', '*.vue'],

    rules: {
      'no-undef': 'off',
      indent: 'off'
    }
  }
]
