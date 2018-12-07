module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "semi": ["error", "never"],
      "camelcase": ["off"],
      "jsx-a11y/media-has-caption": ["off"],
      "jsx-a11y/no-static-element-interactions": ["off"],
      "jsx-a11y/click-events-have-key-events": ["off"],
      "jsx-a11y/anchor-is-valid": ["off"],
      "react/no-string-refs": ["off"],
      "react/no-unknown-property": ["off"],
      "react/jsx-filename-extension": ["off"],
      "react/prop-types": ["off"],
      "react/no-danger": ["off"],
    },
  "globals": {
    "fetch": true,
    "$": true
  },
  "env": {
    "browser": true
  }
};
