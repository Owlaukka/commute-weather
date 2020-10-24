module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:cypress/recommended',
    'prettier',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  rules: {
    // This started triggering after update so maybe after the prettier eslint-config updates this isn't necessary anymore
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Input'],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['webpack.*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
    {
      files: ['**/cypress/**'],
      rules: {
        'no-unused-expressions': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
