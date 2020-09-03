import { FixedArray } from "structures/fixed-array";

export class ArrayList<T> {

    private _array: FixedArray<T>;
    private _size = 0;

    constructor(initialSize = 256) {
        this._array = new FixedArray(initialSize);
    }

    private isInBounds = (i: number) => !(i < 0) && i < this._size;
    private tailIdx = () => this._size - 1;

    public size = () => this._size;

    public getHead = () => ({ value: this._array.get(0), index: 0 });
    public getTail = () => ({ value: this._array.get(this.tailIdx()), index: this.tailIdx() });
    
    public popTail = () => {
        this._size--;
        return this.getTail().value;
    }

    public get(i: number) {
        if (!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
        return this._array.get(i)
    }

    public set(i: number, v: T) {
        if (!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
        this._array.set(i, v);
    }

    public add(v: T) {

        const newIdx = this._size;
        const arrLen = this._array.size();
        if (newIdx === arrLen)
            this._array = this._array.copy(arrLen * 2);

        this._array.set(newIdx, v);
        this._size++;

    }

    public remove(i: number) {

        if (!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);

        for (let j = i + 1; j < this._array.size(); j++)
            this._array.set(j - 1, this._array.get(j));

        this._size--;

    }

    public swapByIndex(aIdx: number, bIdx: number) {
        const a = this._array.get(aIdx);
        const b = this._array.get(bIdx);
        this._array.set(aIdx, b);
        this._array.set(bIdx, a);
    }

}