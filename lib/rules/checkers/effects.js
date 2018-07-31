/**
 * rethrowFx is helper function which takes event as first param and returns effect
 * @param {As} node 
 */
export const isRethrowFx = (node) =>  (
    node.callee.type === 'Identifier'
    && node.callee.name === 'rethrowFx'
    && node.arguments.length
    && node.arguments[0]
    && node.arguments[0].type === 'Literal'
);

/**
 * childFx is helper function which takes event as second param and returns effect
 * @param {As} node 
 */
export const isChildFx = (node) =>  (
    node.callee.type === 'Identifier'
    && node.callee.name === 'childFx'
    && node.arguments.length
    && node.arguments[1]
    && node.arguments[1].type === 'Literal'
);

/**
 * subcomponentFx is helper function which takes event as first param and returns effect
 * @param {As} node 
 */
export const isSubcomponentFx = (node) =>  (
    node.callee.type === 'Identifier'
    && node.callee.name === 'subcomponentFx'
    && node.arguments.length
    && node.arguments[0]
    && node.arguments[0].type === 'Literal'
);



/**
 * Checks for effects
 * @param {*} node 
 */
const effectsCheck = (node) => (
    sendIsMemberExpressionOfThis(node)
    || sendIsMemberExpressionOfThisProps(node)
    || sendIsMemberExpressionOfStream(node)
)

export {
    effectsCheck
}
