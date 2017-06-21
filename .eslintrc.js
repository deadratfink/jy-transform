module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: [
    'jsdoc',
    'filenames',
    'jest',
    'jest-async'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'comma-dangle': [
      'error', {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'ignore',
      }],
    'prefer-template': 'off',
    'consistent-return': 'error',
    'no-case-declarations': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'arrow-body-style': 'off',
    'import/no-commonjs': 'error',
    'import/no-amd': 'error',
    'import/prefer-default-export': 'off',
    strict: ['error', 'never'],
    'max-len': [
      'error', 120, 4, {
        code: 120,
        tabWidth: 4,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      }],
    'no-param-reassign': ['error', { props: false }],
    'require-jsdoc': [
      'error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        }
      }],
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
    'filenames/match-regex': ['error', '^[a-z0-9-]+$'],
  }
};
