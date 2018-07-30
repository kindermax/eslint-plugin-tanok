# eslint-plugin-tanok

Eslint plugin for tanok.js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tanok`:

```
$ npm install eslint-plugin-tanok --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tanok` globally.

## Usage

Add `tanok` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tanok"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tanok/no-literal-events": 2
    }
}
```

## Supported Rules

* no-literal-events - Forbid literal event names in `send` function





