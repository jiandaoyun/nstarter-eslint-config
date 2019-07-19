module.exports = {
    extends: [
        "eslint-config-alloy/typescript",
    ],
    env: {
        browser: false,
        node: true,
        es6: true
    },
    globals: {
        "console": false,
        "exports": false,
        "module": false,
        "require": false,
        "process": false
    }
};