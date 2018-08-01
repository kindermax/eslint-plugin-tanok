/**
 * on decorator is used for binding event to handler in tanokDispatcher
 * @param {*} node 
 */
const isOnDecorator = (node) => (
    node.expression
    && node.expression.type === 'CallExpression'
    && node.expression.callee
    && node.expression.callee.type === 'Identifier'
    && node.expression.callee.name === 'on'
    && node.expression.arguments
    && node.expression.arguments.length
    && node.expression.arguments[0].type === 'Literal'
)

/**
 * Checks for on decorator
 * @param {*} node 
 */
const onDecoratorCheck = (node) => (
    isOnDecorator(node)
)

module.exports = {
    onDecoratorCheck
}
