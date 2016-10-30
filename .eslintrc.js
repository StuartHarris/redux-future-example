module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "airbnb"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "expect": true,
    "Generator": true,
    "spy": true
  },
  "plugins": [
    "babel",
    "react",
  ],
  "rules": {
    "import/imports-first": 1,
    "import/prefer-default-export": 1,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": [
      '**/*.test.js',
      '**/*.spec.js'
    ]}],
    "arrow-parens": 0,
    "no-shadow": 0,
    "new-cap": 0,
    "require-yield": 1,
    "max-len": [1, 200, 2, {"ignoreComments": true}],
    "import/no-duplicates": 0,
    "no-duplicate-imports": 0,
    "no-use-before-define": ["error", { functions: false }],
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 1,
    "react/no-string-refs": 1,
    "react/no-unused-prop-types": 1,
    "class-methods-use-this": 1,
    "jsx-a11y/no-static-element-interactions": 1,
    "jsx-a11y/label-has-for": 1,
  }
};
