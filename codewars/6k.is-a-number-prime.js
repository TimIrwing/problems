function isPrime(num) {
    if (num <= 1) return false;

    for (let i = 2, intSqrt = Math.floor(Math.sqrt(num)); i <= intSqrt; ++i) {
        if (num % i === 0) return false;
    }

    return true;
}
