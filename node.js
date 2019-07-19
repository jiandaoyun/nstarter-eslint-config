module.exports = {
    extends: ['./base.js'],
    plugins: [
        "import"
    ],
    rules: {
        "accessor-pairs": ["off"],
        "arrow-body-style": ["warn", "as-needed"],
        "curly": ["error", "all"],
        "default-case": ["error"],
        "eol-last": ["warn", "always"],
        "function-paren-newline": ["off"],
        "implicit-arrow-linebreak": ["off"],
        "linebreak-style": ["error", "unix"],
        "max-nested-callbacks": ["error", { max: 5 }],
        "no-useless-call": ["off"],
        "object-shorthand": ["error", "always"],
        "one-var": ["off"],
        "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
        "prefer-const": ["error"],
        "prefer-numeric-literals": ["error"],
        "spaced-comment": [
            "error", "always", {
                "exceptions": [
                    "#alt",
                    "#endalt"
                ],
                "markers": [
                    "#",
                    "#module",
                    "#endmodule",
                ]
            }
        ],
        "template-curly-spacing": ["warn", "always"],
        "yoda": ["off"],

        // import
        "import/no-default-export": ["error"],
        "import/no-unused-modules": ["error"]
    }
}