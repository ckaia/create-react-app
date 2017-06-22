module.exports = {
  extends: [
    'airbnb'
  ],
  rules: {
    'arrow-parens': [2, 'as-needed', {'requireForBlockBody': false}],
    'comma-dangle': ['off'],
    'import/prefer-default-export': 'off',
    'max-len': ['error', 120],
    'no-inline-comments': ['error'],
    'no-loop-func': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-spacing': ['error', 'never']
  },
  env: {
    browser: true
  }
}
