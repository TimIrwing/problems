function tickets(peopleInLine) {
    const COST = 25;
    const bills = {
        100: 0,
        50: 0,
        25: 0,
    };
    const billsFromTop = Object.keys(bills)
        .map((val) => Number(val))
        .sort((a, b) => b - a);

    for (const clientBill of peopleInLine) {
        let change = clientBill - COST;

        if (change !== 0) {
            for (const bill of billsFromTop) {
                if (bill <= change) {
                    const count = Math.min(
                        Math.floor(change / bill),
                        bills[bill]
                    );

                    change -= bill * count;
                    bills[bill] -= count;
                }
            }
        }

        if (change !== 0) return 'NO';

        bills[clientBill]++;
    }

    return 'YES';
}
