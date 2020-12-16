module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx", ".tsx"]
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "off",
    "react/prop-types": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "prettier/prettier": ["error"]
  }
}
