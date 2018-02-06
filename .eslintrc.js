module.exports = {
  globals: {
    server: true,
    waitForReduxStateChange: true,
    waitForReduxStateToEqual: true,
    dispatchReduxAction: true,
    waitFor: true
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    // BASIC ESLINT RULES
    //'array-bracket-spacing': ['error', 'never'], May enforce this in the future
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': false
    }],
    'camelcase': ['error', {
      'properties': 'never'
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error'],
    'comma-style': ['error', 'last'],
    'curly': ['error', 'all'],
    'dot-notation': 'error',
    'dot-location': ['error', 'property'],
    'generator-star-spacing': ['error', {'before': false, 'after': true}],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': 'error',
    'max-statements-per-line': ['error', { 'max': 1 }],
    'new-cap': ['error', {
      // Capital variables that can be used without `new`
      'capIsNewExceptions': [
        'A' // Ember.A
      ]
    }],
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-multiple-empty-lines': 'error',
    'no-multi-spaces': 'error',
    'no-nested-ternary': 'error',
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 'error',
    'one-var': ['error', {
      'uninitialized': 'always',
      'initialized': 'never'
    }],
    'operator-linebreak': ['error', 'after'],
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quotes': ['error', 'single', {
      'avoidEscape': true
    }],
    'radix': ['error', 'always'],
    'rest-spread-spacing': ["error"],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      'words': false,
      'nonwords': false
    }],
    'spaced-comment': ['error', 'always'],

    // SUAVE CUSTOM RULES
    'ember-suave/no-direct-property-access': 'error',
    'ember-suave/prefer-destructuring': 'error',
    'ember-suave/require-access-in-comments': 'error',
    'ember-suave/require-const-for-ember-properties': 'error',
    'ember-suave/no-const-outside-module-scope': 'off'
  }
};
