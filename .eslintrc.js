module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'plugins': [
    'jsx-a11y',
    'react'
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'rules': {
    'strict': [2, 'never'],
    'prefer-template': 0,
    'class-methods-use-this': 0,

    // Code style
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore'
    }],
    'indent': [2, 2, {'SwitchCase': 1, 'VariableDeclarator': 1}],
    'eol-last': 'off',
    'no-console': ['error', {'allow': ['warn', 'error']}],

    'jsx-a11y/href-no-hash': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/prefer-default-export': 'off',
  }
};
