'use strict';

const rule = require('../no-literal-events');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 7,
    },
});

ruleTester.run('no-literal-events/send', rule, {
    valid: [
        "this.send(EVENT)",
        "this.props.send(EVENT)",
        "stream.send(EVENT)",
    ],
    invalid: [
        {
            code: "this.send('event')",
            errors: [
              {
                message: "Do not use string literal 'event' as event in `send`, use constant variable",
                column: 11,
                line: 1,
              },
            ],
        },
        {
            code: "this.props.send('event')",
            errors: [
              {
                message: "Do not use string literal 'event' as event in `send`, use constant variable",
                column: 17,
                line: 1,
              },
            ],
        },
        {
            code: "stream.send('event')",
            errors: [
              {
                message: "Do not use string literal 'event' as event in `send`, use constant variable",
                column: 13,
                line: 1,
              },
            ],
        },
    ]
});

// ruleTester.run('no-literal-events/on', rule, {
//     valid: [
//         `
//             class Dispatcher {
//                 @on(EVENT_INIT)
//                 init(_, state) {}
//             }
//         `,
//     ],
//     invalid: [
//         {
//             code: `
//                 class Dispatcher {
//                     @on('event_init')
//                     init(_, state) {}
//                 }
//             `,
//             errors: [
//               {
//                 message: "Do not use string literal 'event_init' as event in `on` decorator, use constant variable",
//                 column: 1,
//                 line: 1,
//               },
//             ],
//         },
//     ]
// });


ruleTester.run('no-literal-events/effects', rule, {
    valid: [
        "rethrowFx(EVENT)",
        "childFx(EVENT)",
        "childFx(rethrowFx(EVENT_FOO), EVENT_BAR)",
        "subcomponentFx(EVENT)",
    ],
    invalid: [
        {
            code: "rethrowFx('event')",
            errors: [
              {
                message: "Do not use string literal 'event' as event in `rethrowFx`, use constant variable",
                column: 11,
                line: 1,
              },
            ],
        },
        {
            code: "childFx(event, 'event_bar')",
            errors: [
              {
                message: "Do not use string literal 'event_bar' as event in `childFx`, use constant variable",
                column: 16,
                line: 1,
              },
            ],
        },
        {
            code: "childFx(rethrowFx('event_foo'), 'event_bar')",
            errors: [
              {
                message: "Do not use string literal 'event_foo' as event in `rethrowFx`, use constant variable",
                column: 19,
                line: 1,
              },
              {
                message: "Do not use string literal 'event_bar' as event in `childFx`, use constant variable",
                column: 33,
                line: 1,
              },
            ],
        },
        {
            code: "subcomponentFx('event')",
            errors: [
              {
                message: "Do not use string literal 'event' as event in `subcomponentFx`, use constant variable",
                column: 16,
                line: 1,
              },
            ],
        },
    ]
});