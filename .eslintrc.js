module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    browser: true
  },
  globals: {
    __DEV__: true,
    __PROD__: true,
    __SERVER__: true,
    __CLIENT__: true
  },
  extends: "eslint-config-airbnb",
  plugins: [
    'react',
    'flowtype'
  ],
  rules: {
    "arrow-parens": 0,
    "comma-dangle": 0,
    "eol-last":0,
    "global-require": 0,
    "import/default": 0,
    "import/no-duplicates": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 2,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "indent": [2, 2, {"SwitchCase": 1}],
    "no-console": 0,
    "no-alert": 0,
    "no-multiple-empty-lines": [2, {"max": 99999, "maxEOF": 0}],
    "no-underscore-dangle": 0,
    "no-unreachable": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-multi-comp": 0,
    "react/no-danger": 0,
    "react/forbid-prop-types": 0,
    "generator-star-spacing": 0,
    "prefer-destructuring": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/label-has-for": 0,
    "object-curly-newline": 0,
    "array-callback-return": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/require-default-props": 0,
    "no-proto": 0,
    "jsx-a11y/media-has-caption": 0
  }
}
