const { sendCheck } = require('./checkers/send');
const { effectsCheck } = require('./checkers/effects');
const { onDecoratorCheck } = require('./checkers/on');
const {
    reportForSend,
    reportForEffect,
    reportForOnDecorator
} = require('./utils/report');

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
                if (sendCheck(node)) {
                    const targetNode = node.arguments[0];
                    const event = targetNode.value;
                    reportForSend(context, targetNode, event);
                }

                if (effectsCheck(node)) {
                    const effect = node.callee.name;
                    const targetNode = effect === 'childFx'
                        ? node.arguments[1]
                        : node.arguments[0];
                    const event = targetNode.value;
                    reportForEffect(context, targetNode, effect, event);
                }
            },
            Decorator: function(node) {
                if (onDecoratorCheck(node)) {
                    const targetNode = node.expression.arguments[0];
                    const event = targetNode.value;
                    reportForOnDecorator(context, node, event);
                }
            }
        };
    }
};