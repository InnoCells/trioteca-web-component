module.exports = {
  parser: 'babel-eslint',
  globals: {
    fetch: false
  },
  env: {
    browser: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }]
  }
};
