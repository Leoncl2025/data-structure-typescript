class MyEle {
    constructor(public val: number, public min: number) {}
}

class MinStack {
    private stack: MyEle[] = [];
    constructor() {
    }

    lastElement(): MyEle {
        return this.stack[this.stack.length - 1];
    }

    push(val: number): void {
        if (!this.stack.length) {
            this.stack.push(new MyEle(val, val));
            return;
        }
        const lastTop = this.lastElement();
        const min = Math.min(lastTop.min, val);
        this.stack.push(new MyEle(val, min));
    }

    pop(): void {
        this.stack.pop();
    }

    top(): number {
        return this.lastElement().val;
    }

    getMin(): number {
        return this.lastElement().min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */