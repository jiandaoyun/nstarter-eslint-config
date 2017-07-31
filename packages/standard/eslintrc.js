module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
    	"eslint-config-standard",
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "modules": true,
            "spread" : true,
            "restParams" : true
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
    ],
    rules: {
        "max-len": [2, {"code": 120, "tabWidth": 4}],
    	"indent": 0,
    	"no-tabs": 0,
        "brace-style": [2, "stroustrup"],
        "no-trailing-spaces": 0,
        "no-mixed-spaces-and-tabs": 0,
    	"no-redeclare": 0,
    	"semi": [2, "always"],
    	"eol-last": 0,
    	"no-unused-vars": [1, {"args": "none", "varsIgnorePattern": "React|Preact|Root|Vue|h"}],
    	"space-before-function-paren": 0,
    	"one-var": 0,
    	"one-var-declaration-per-line": [2, "initializations"],
    	"padding-line-between-statements": [
    		2,
    		{ blankLine: "always", prev: "var", next: "return" },
    		{ blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    		{ blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]},
    		{ blankLine: "always", prev: "directive", next: "*" },
    		{ blankLine: "any",    prev: "directive", next: "directive" }
    	],
    	"quotes": [2, "single", { "allowTemplateLiterals": true }],
    	"no-undefined": [2],
        "operator-linebreak": [2, "before"],
        "no-useless-escape": 0,
        "import/first": 0,
        "no-await-in-loop": 1,
        "babel/new-cap": [1, {"capIsNew": false}],
        "babel/object-curly-spacing": 0,
        "babel/no-invalid-this": 0
    },
    "globals": {
        "React": true,
        "ReactDOM": true,
        "Vue": true,
        "Mqq": true,
        "mqq": true,
        "define": true,
        "QReport": true,  
    }
};