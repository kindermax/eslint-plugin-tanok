const reportForSend = (context, node, event) => {
    context.report({
        node: node,
        message: "Do not use string literal '{{ event }}' as event in `send`, use constant variable",
        data: { event }
    });
}

const reportForEffect = (context, node, effect, event) => {
    context.report({
        node: node,
        message: "Do not use string literal '{{ event }}' as event in `{{ effect }}`, use constant variable",
        data: {
            event,
            effect,
        }
    });
}

const reportForOnDecorator = (context, node, event) => {
    context.report({
        node: node,
        message: "Do not use string literal '{{ event }}' as event in `on` decorator, use constant variable",
        data: { event }
    });
}

module.exports = {
    reportForSend,
    reportForEffect,
    reportForOnDecorator,
}
