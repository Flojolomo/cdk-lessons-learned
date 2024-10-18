const utils = require('/opt/nodejs/utils');

exports.handler = async (event) => {
    const greeting = utils.generateGreeting('User');
    const factorialOf5 = utils.factorial(5);
    const is17Prime = utils.isPrime(17);

    return {
        statusCode: 200,
        body: JSON.stringify({
            greeting,
            factorialOf5,
            is17Prime
        }),
    };
};