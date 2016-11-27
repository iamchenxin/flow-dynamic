// see http://eslint.org/docs/user-guide/configuring.html#configuring-rules
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "rules": {
    // fbjs: WARNING
    'indent': [ERROR, 2, {SwitchCase: 1}],
    // fbjs: WARNING
    'quotes': [ERROR, 'single', 'avoid-escape'],
    // fbjs: 'operator-linebreak': OFF,
    "linebreak-style": [ERROR, "unix"],
    // fbjs: WARNING
    "semi": [ERROR, "always"],

    // eslint-plugin-flowtype
    "flowtype/define-flow-type": WARNING,
    "flowtype/use-flow-type": WARNING,
  //  "flowtype/require-parameter-type": 1,
  //    "flowtype/valid-syntax": 1,
    "flowtype/require-return-type": [
        OFF,
        "always",
        {
          "annotateUndefined": "always",
          "excludeArrowFunctions": true
        }
    ],
    "flowtype/space-after-type-colon": [
        WARNING,
        "always"
    ],
    "flowtype/space-before-type-colon": [
        WARNING,
        "never"
    ],
    "flowtype/type-id-match": [
        WARNING,
        "^([A-Z][a-z0-9]+)+"
    ],
  },
  "settings": {
    "flowtype": {
        "onlyFilesWithFlowAnnotation": true
    }
  },
  "env": {
    "es6": true,
    "node": true
  },
  "parserOptions": {
  //  "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "extends": ["fbjs"]
};
