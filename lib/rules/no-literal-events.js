/**
 * The 1.X version of tanok uses @tanokComponent decorator
 * which adds some behaviour to React component.
 * `send` function is one of those, used to send events to tanok application stream.
 * The way `send` function called in tanok1.X is `this.send` as `send` is added 
 * to component prototype by @tanokComponent decorator
 * @param {As} node 
 */
const sendIsMemberExpressionOfThis = (node) =>  (
    node.callee.type === 'MemberExpression'
    && node.callee.property
    && node.callee.property.type === 'Identifier'
    && node.callee.property.name === 'send'
    && node.callee.object
    && node.callee.object.type === 'ThisExpression'
    && node.arguments.length
    && node.arguments[0]
    && node.arguments[0].type === 'Literal'
);

/**
 * The 2.X version of tanok has redux-like api and uses @connent decorator
 * which expects a function as second param. Function has `send` function as first param.
 * `send` function is used to send events to tanok application stream.
 * The way `send` function called in tanok2.X is `this.props.send` as `send` is passed 
 * as prop by @connect decorator
 * @param {As} node 
 */
const sendIsMemberExpressionOfThisProps = (node) =>  (
    node.callee.type === 'MemberExpression'
    && node.callee.property
    && node.callee.property.type === 'Identifier'
    && node.callee.property.name === 'send'
    && node.callee.object
    && node.callee.object.type === 'MemberExpression'
    && node.callee.object.property
    && node.callee.object.property.type === 'Identifier'
    && node.callee.object.property.name === 'props'
    && node.arguments.length
    && node.arguments[0]
    && node.arguments[0].type === 'Literal'
);

/**
 * It is general pattern in tanok applications to write effect, 
 * function with one argument which is a tanok streamWrapper
 * (stream) => { stream.send(a.EVENT) }
 * @param {*} node 
 */
const sendIsMemberExpressionOfStream = (node) =>  (
    node.callee.type === 'MemberExpression'
    && node.callee.property
    && node.callee.property.type === 'Identifier'
    && node.callee.property.name === 'send'
    && node.callee.object
    && node.callee.object.type === 'Identifier'
    && node.callee.object.name === 'stream'
    && node.arguments.length
    && node.arguments[0]
    && node.arguments[0].type === 'Literal'
);

module.exports = {
    meta: {
        docs: {
            description: "disallow literal events",
            category: "Possible Errors",
            recommended: true,
        },
        schema: [] // no options
    },
    create: function(context) {
        return {
            CallExpression: function(node) {
                if (
                    sendIsMemberExpressionOfThis(node)
                    || sendIsMemberExpressionOfThisProps(node)
                    || sendIsMemberExpressionOfStream(node)
                ) {
                    context.report({
                        node: node,
                        message: "Do not use string literal '{{ event }}' as event in `send`, use constant variable",
                        data: {
                            event: node.arguments[0].value
                        }
                    });
                }
            },
        };
    }
};