module.exports = {
    extends: ['./node.js'],
    rules: {
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "Object": {
                    "message": "Use '{}' instead",
                    "fixWith": "{}"
                },
                "String": {
                    "message": "Use 'string' instead",
                    "fixWith": "string"
                },
                "Number": {
                    "message": "Use 'number' instead",
                    "fixWith": "number"
                },
                "Boolean": {
                    "message": "Use 'boolean' instead",
                    "fixWith": "boolean"
                }
            }
        }],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
                overrides: {
                    constructors: "no-public",
                }
            }
        ],
        "@typescript-eslint/indent": ["off"],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                },
                "overrides": {
                    "typeLiteral": {
                        "multiline": {
                            "delimiter": "comma",
                            "requireLast": false
                        },
                        "singleline": {
                            "delimiter": "comma",
                            "requireLast": false
                        }
                    }
                }
            }
        ],
        "@typescript-eslint/member-ordering": [
            "warn",
            {
                default: [
                    // Fields
                    "static-field",
                    "instance-field",

                    // Constructors
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",

                    // Methods
                    "private-static-method",
                    "protected-static-method",
                    "public-static-method",
                ]
            }
        ],
        "@typescript-eslint/no-empty-interface": ["off"],
        "@typescript-eslint/no-object-literal-type-assertion": ["error", {
            allowAsParameter: true
        }],
        "@typescript-eslint/no-require-imports": ["error"],
        "@typescript-eslint/prefer-function-type": ["off"]
    }
};
