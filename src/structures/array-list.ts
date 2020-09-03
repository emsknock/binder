import { FixedArray } from "./fixed-array";

export class ArrayList<T> {

    private _array: FixedArray<T>;
    private _size: number;

    constructor(initialSize = 256) {
        this._size = initialSize;
        this._array = new FixedArray(initialSize);
    }

    public isInBounds = (i: number) => !(i < 0) && i < this._size;

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

        const newIdx = this._size + 1;
        const arrLen = this._array.size();
        if (newIdx >= arrLen)
            this._array = this._array.copy(arrLen * 2);

        this._array.set(newIdx, v);
        this._size++;

    }
    
    public remove(i: number) {

        for (let j = i + 1; j < this._array.size(); j++)
            this._array.set(j - 1, this._array.get(j));

        this._size--;

    }

}