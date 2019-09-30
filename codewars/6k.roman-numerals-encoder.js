function solution(number) {
    const str = String(number);
    const length = str.length;
    let result = '';

    switch (length) {
        case 4:
            for (let i = 0; i < Number(str[length - 4]); ++i) {
                result += 'M';
            }

        case 3:
            result += toRoman(Number(str[length - 3]), 'C', 'D', 'M');

        case 2:
            result += toRoman(Number(str[length - 2]), 'X', 'L', 'C');

        case 1:
            result += toRoman(Number(str[length - 1]), 'I', 'V', 'X');
    }

    return result;

    function toRoman(digit, leftSymb, middleSymb, rightSymb) {
        let result = '';

        if (digit === 0) return result;

        switch (digit) {
            case 1:
            case 2:
            case 3:
                for (let i = 0; i < digit; ++i) {
                    result += leftSymb;
                }
                break;

            case 4:
                result = leftSymb + middleSymb;
                break;

            case 5:
                result = middleSymb;
                break;

            case 6:
            case 8:
            case 7:
                result = middleSymb;
                for (let i = 5; i < digit; ++i) {
                    result += leftSymb;
                }
                break;

            case 9:
                result = leftSymb + rightSymb;
                break;
        }

        return result;
    }
}
