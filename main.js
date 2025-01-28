    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    var getWinner = function(arr, k) {
        let ele = new Element(arr[0], 0, 1);
        for (let i = 1; i < arr.length; i++) {
            const val = arr[i];
            if (val > ele.val) {
                ele = new Element(val, i, i + 1);
            } else {
                ele.end = i + 1;
            }
            if (ele.count >= k) {
                return ele.val;
            }
        }
        return ele.val;
    };

    class Element {
        constructor(val, index, end) {
            this.val = val;
            this.index = index;
            this.end = end;
        }
        get count() {
            const count = this.index === 0 ? (this.end - this.index - 1) : (this.end - this.index);
            return count;
        }
    }