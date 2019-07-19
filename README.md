Basic eslint rules for nstarter projects.

## Install

```
npm install --save-dev eslint-config-nstarter
```

## Usage

Create a `.eslintrc.js` file with configuration like this.

```javascript
module.exports = {
    extends: [
        "nstarter/typescript",
    ],
    rules: {
        // Your rules here
    }
};
```
