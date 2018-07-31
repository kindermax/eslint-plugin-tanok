/**
 * on decorator is used for binding event to handler in tanokDispatcher
 * @param {*} node 
 */
const isOnDecorator = (node) => (
    node.expression.callee.name === 'on'
    && node.expression.arguments[0].type === 'Literal'
)

/**
 * Checks for on decorator
 * @param {*} node 
 */
const onDecoratorCheck = (node) => (
    isOnDecorator(node)
)

export {
    onDecoratorCheck
}
