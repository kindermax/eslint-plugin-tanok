import { sendCheck } from './checkers/send';
import { effectsCheck } from './checkers/effects';
import { onDecoratorCheck } from './checkers/on';

import { 
    reportForSend, 
    reportForEffect, 
    reportForOnDecorator 
} from './utils/report';

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