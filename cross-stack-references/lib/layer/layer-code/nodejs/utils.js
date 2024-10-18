// A simple function to generate a greeting
function generateGreeting(name) {
    // console.log("This will cause the layer to break")
    return `Hello, ${name}! Welcome to our Lambda function.`;
}

// A function to calculate the factorial of a number
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// A function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Export the functions so they can be used by Lambda functions
module.exports = {
    generateGreeting,
    factorial,
    isPrime
};