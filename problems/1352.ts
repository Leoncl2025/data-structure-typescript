class ProductOfNumbers {
    private prodArr: number[] = [];
    constructor() {
    }

    add(num: number): void {
        if (num === 0) {
            this.prodArr = [];
            return;
        }
        const num1 = num;
        const prod = this.prodArr.length === 0 ? num1 : this.prodArr[this.prodArr.length - 1] * num1;
        this.prodArr.push(prod);
    }

    getProduct(k: number): number {
        if (k > this.prodArr.length) return 0;
        const index = this.prodArr.length - k;
        const prodPrev = index <= 0 ? 1 : this.prodArr[index - 1];
        return Math.round(this.prodArr[this.prodArr.length - 1] / prodPrev);
    }
}