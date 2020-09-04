import { ArrayList } from "structures/array-list";

export class PriorityQueue<T> {

    private _list = new ArrayList<{ value: T, priority: number }>();

    private parentOf = (i: number) => this._list.has(i)
        ? ({ ...this._list.get(~~(i / 2)), index: ~~(i / 2) }) // Double tilde is equivalent to floor()
        : null;

    private rChildOf = (i: number) => this._list.has(i)
        ? ({ ...this._list.get(2 * i + 1), index: 2 * i + 1 })
        : null;

    private lChildOf = (i: number) => this._list.has(i)
        ? ({ ...this._list.get(2 * i), index: 2 * 1 })
        : null;

    public size = () => this._list.size();

    public push(value: T, priority: number) {

        const list = this._list;
        list.add({ value, priority });

        let nodeIdx = list.getTail().index;
        while (true) {
            const parent = this.parentOf(nodeIdx);
            if (priority > (parent?.priority ?? Infinity)) {
                list.swapByIndex(nodeIdx, parent!.index);
                nodeIdx = parent!.index;
            } else {
                break;
            }
        }

    }

    public pop() {

        const list = this._list;

        list.swapByIndex(0, list.getTail().index);
        const value = list.popTail();

        if (list.size() < 2) return value;

        let nodeIdx = 0;
        while (true) {

            const { priority } = list.get(nodeIdx);
            const rChild = this.rChildOf(nodeIdx);
            const lChild = this.lChildOf(nodeIdx);

            if (!rChild && !lChild) break;

            const maxChild = !rChild || !lChild
                ? (rChild ?? lChild)!
                : rChild.priority > lChild.priority
                    ? rChild
                    : lChild;

            if (maxChild.priority > priority) {
                list.swapByIndex(nodeIdx, maxChild.index);
                nodeIdx = maxChild.index;
            } else {
                break;
            }

        }

        return value;

    }

}