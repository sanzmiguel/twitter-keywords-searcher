module.exports = {
  plugins: ['security'],
  extends: ['standard', 'plugin:security/recommended'],
  rules: {
    semi: [2, 'always']
  },
  env: {
    jest: true
  }
};
