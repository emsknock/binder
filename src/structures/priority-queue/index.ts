import { ArrayList } from "structures/array-list";

export class PriorityQueue<T> {

	private _list = new ArrayList<{ value: T, priority: number }>();

	private parentOf = (i: number) => {
		if (i === 0) return null;
		return this._list.has(~~(i / 2))
			? ({ ...this._list.get(~~(i / 2)), index: ~~(i / 2) }) // Double tilde is equivalent to floor()
			: null;
	}

	private rChildOf = (i: number) => this._list.has(2 * i + 2)
		? ({ ...this._list.get(2 * i + 2), index: 2 * i + 2 })
		: null;

	private lChildOf = (i: number) => this._list.has(2 * i + 1)
		? ({ ...this._list.get(2 * i + 1), index: 2 * i + 1 })
		: null;

	public size = () => this._list.size();

	public push(value: T, priority: number) {

		const list = this._list;
		list.add({ value, priority });

		let nodeIdx = list.getTail().index;
		while (true) {

			const parent = this.parentOf(nodeIdx);

			if (!parent) break;
			if (priority < parent.priority) break;

			list.swapByIndex(nodeIdx, parent!.index);
			nodeIdx = parent.index;

		}

	}

	/**
	 * Retrieve and remove the most prioritised element in the queue.
	 */
	public pop() {

		const list = this._list;

		list.swapByIndex(0, list.getTail().index);
		const { value } = list.popTail();

		// The heap is either empty or has a single node left, so we can skip the rest of max-heapify
		if (list.size() < 2) return value;

		let nodeIdx = 0;
		while (true) {

			const { priority } = list.get(nodeIdx);
			const rChild = this.rChildOf(nodeIdx);
			const lChild = this.lChildOf(nodeIdx);

			// If neither child exist, the node is a leaf and max-heapify is complete
			if (!rChild && !lChild) break;

			// - If either child doesn't exist (one must as per above),
			//   the one that does exist is automatically the max child
			// - If both exist, the max child is the one with a higher priority
			// - If both exist and have equal priority, it doesn't matter which one
			//   is used as the max child
			const maxChild = !rChild || !lChild
				? (rChild ?? lChild)!
				: rChild.priority > lChild.priority
					? rChild
					: lChild;

			if (maxChild.priority < priority) break;

			list.swapByIndex(nodeIdx, maxChild.index);
			nodeIdx = maxChild.index;

		}

		return value;

	}

}