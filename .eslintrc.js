module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: [
    'import',
    'jsdoc',
    'json',
    'filenames',
    'jest',
    'jest-async'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': [
      'error', {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'ignore',
      }],
    'consistent-return': 'error',
    'filenames/match-regex': ['error', '^[a-z0-9-]+$'],
    'function-paren-newline': 'off', //['error', 'multiline'],
    'import/no-amd': 'error',
    'import/no-commonjs': 'error',
    'import/prefer-default-export': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jest-async/expect-return': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/newline-after-description': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'error',
    'max-len': [
      'error', 120, 4, {
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-case-declarations': 'error',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'prefer-template': 'off',
    'require-jsdoc': [
      'error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        }
      }],
    strict: ['error', 'never'],
  },
  settings: {
    jsdoc: {
      additionalTagNames: {
        customTags: ['resolve', 'reject']
      },
    }
  }
};
