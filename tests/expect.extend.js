expect.extend({
    /**
     * Ensure @received value in a Number between @floor and @ceiling (both included).
     */
    toBeWithinRange(received, floor, ceiling) {
        const { matcherErrorMessage, printReceived, printExpected, printWithType } = this.utils;
        const hint = this.isNot
            ? `expect(${printReceived('received')}).not().toBeWithinRange(${printExpected('floor')}, ${printExpected('ceiling')})`
            : `expect(${printReceived('received')}).toBeWithinRange(${printExpected('floor')}, ${printExpected('ceiling')})`;

        if (typeof floor !== 'number' || floor === null || Number.isNaN(floor)) {
            throw new Error(
                matcherErrorMessage(hint,
                    `${printReceived('floor')} value must be a valid number`,
                    printWithType('Floor', floor, printExpected)),
            );
        }
        if (typeof ceiling !== 'number' || typeof ceiling !== 'number' || Number.isNaN(ceiling)) {
            throw new Error(
                matcherErrorMessage(hint,
                    `${printReceived('ceiling')} value must be a valid number`,
                    printWithType('Ceiling', ceiling, printExpected)),
            );
        }
        if (floor > ceiling) {
            throw new Error(
                matcherErrorMessage(hint,
                    `${printExpected('floor')} value must be greater than ${printExpected('ceiling')} value`,
                    `Floor: ${printExpected(floor)}\nCeiling: ${printExpected(ceiling)}`),
            );
        }

        if (typeof received !== 'number' || typeof received !== 'number' || Number.isNaN(received)) {
            return {
                message: () => matcherErrorMessage(hint,
                    `expected ${printReceived(received)} to be a vadlid number`,
                    printWithType('Received', received, printReceived)),
                pass: false,
            };
        }

        const pass = floor <= received && received <= ceiling;
        return {
            message: () => `expected ${printReceived(received)} to be ${pass ? 'outside' : 'within'} range ${printExpected(floor)} - ${printExpected(ceiling)}`,
            pass,
        };
    },
});
