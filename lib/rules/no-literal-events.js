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
                    const event = node.arguments[0].value;
                    reportForSend(context, node, event);
                }

                if (effectsCheck(node)) {
                    const effect = node.callee.name;
                    const event = effect === 'childFx'
                        ? node.arguments[1].value
                        : node.arguments[0].value;

                    // TODO pass proper node
                    reportForEffect(context, node, effect, event);
                }
            },
            Decorator: function(node) {
                if (onDecoratorCheck(node)) {
                    const event = node.expression.arguments[0].value;
                    reportForOnDecorator(context, node, event);
                }
            }
        };
    }
};