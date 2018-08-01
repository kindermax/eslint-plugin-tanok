/**
 * @fileoverview Eslint plugin for tanok.js
 * @author Kindritskiy Maksym
 */
"use strict";

const noLiteralEvents = require("./rules/no-literal-events");

module.exports = {
    configs: {
        recommended: {
          plugins: ['tanok'],
          rules: {
            'tanok/no-literal-events': 'warn',
          },
        },
      },
    rules: {
        'no-literal-events': noLiteralEvents,
    }
} 
