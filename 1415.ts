function getHappyString(n: number, k: number): string {
    const baseLetters = ['a', 'b', 'c'];
    const letters = [];
    const baseCount = totalHappyStrings(n);
    let rest = k - 1;
    for (let i = 0; i < n; i++) {
        if ( i == 0) {
            const index = Math.floor(rest / baseCount[i]);
            if (index >= 3) {
                return '';
            }
            letters.push(baseLetters[index]);
        } else {
            const index = Math.floor(rest / baseCount[i]);
            const lastLetter = letters[letters.length - 1];
            const nextLetter = baseLetters.filter(l => l !== lastLetter)[index];
            letters.push(nextLetter);
        }
        rest = rest % baseCount[i];
    }
    return letters.join('');
};

function totalHappyStrings(n: number): number[] {
    const base = [1];
    for (let i = 0; i < n - 1; i++) {
        const last = base[base.length - 1] || 1;
        base.push(2 * last);
    }

    return base.reverse();
}
