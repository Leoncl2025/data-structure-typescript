/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 * 
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */
class _Node {
    val: number;
    next: _Node | null;
    random: _Node | null;

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
        this.random = (random === undefined ? null : random);
    }
}


function copyRandomList(head: _Node | null): _Node | null {
    if (!head) return null;
    const { list, vals } = getList(head);
    list.forEach((node, index) => {
        node.next = list[index + 1] || null;
        if (node.random) {
            node.random = list[node.random.val];
        }
    });
    return list[0];
};

function getList(head: _Node | null): {list: _Node[], vals: number[]} | null {
    let cur = head;
    let list = [];
    let vals = [];
    let index = 0;
    while (cur) {
        list.push(new _Node(cur.val, null, cur.random));
        vals.push(cur.val);
        cur.val = index;
        cur = cur.next;
        index++;
    }
    return { list, vals };
}