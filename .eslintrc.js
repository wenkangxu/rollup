module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: [
    "import",
    "prettier"
  ],
  parserOptions : {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "semi": "error",
    "no-unused-vars":['error', { "args": "none" }],
    "object-shorthand": "error",
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "class-methods-use-this": "off",
    "no-use-before-define": "error",
    "import/imports-first": ["error"],
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "error",
    "import/extensions": "off",
    "import/newline-after-import": "error",
    'global-require': "off",
    'no-underscore-dangle': "off",
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
  }
};
