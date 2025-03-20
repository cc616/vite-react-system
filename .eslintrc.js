module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projects: 'tsconfig.json',
    ecmaFeatures: {
      "jsx": true
    },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-react'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'mock/*'],
  rules: {
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
