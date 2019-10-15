function validParentheses(parens) {
    return checkSequence(parens, 0) === 0;

    function checkSequence(str, leftover) {
        if (leftover < 0 || str.length === 0) return leftover;

        return checkSequence(
            str.slice(1),
            leftover + (str[0] === '(' ? 1 : -1)
        );
    }
}
