module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-native', 'prettier'],
  rules: {
    curly: [1, 'all'],
    'padding-line-between-statements': [
      1,
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'multiline-block-like',
          'multiline-const',
          'multiline-let',
          'multiline-expression',
          'multiline-var',
          'return',
          'case',
          'class',
          'export',
        ],
      },
    ],
    'max-len': [
      1,
      {
        code: 80,
        ignoreStrings: true,
        ignoreComments: true,
      },
    ],
    'react/jsx-curly-brace-presence': [1, {children: 'always'}],
    'arrow-body-style': 0,
    'prefer-arrow-callback': 0,
    'react/forbid-prop-types': 0,

    // false alarm
    'no-use-before-define': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.jsx']}],

    'prettier/prettier': [
      1,
      {
        singleQuote: true,
        endOfLine: 'auto',
        bracketSpacing: false,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};
