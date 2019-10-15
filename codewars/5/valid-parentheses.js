function validParentheses(sequence) {
    const stack = [];

    for (const parenthesis of sequence) {
        if (parenthesis === '(') {
            stack.push(parenthesis);
        } else if (stack.length > 0) {
            stack.pop();
        } else {
            return false;
        }
    }

    return stack.length === 0;
}
