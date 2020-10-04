import { FixedArray } from "structures/fixed-array";
import { Identifiable } from "types/identifiable";

export class ArrayList<T> implements Identifiable {

    static ID = 0;
    public readonly id: number;

    private _array: FixedArray<T>;
    private _size = 0;

    constructor(initialSize = 256) {
        this.id = ++ArrayList.ID;
        this._array = new FixedArray(initialSize);
    }

    private isInBounds = (i: number) => !(i < 0) && i < this._size;

    /** Returns true if this list has an element with the given index */
    public has = (i: number) => this.isInBounds(i);
    public size = () => this._size;

    /**
     * Returns the value and the index of the head element as
     * ```typescript
     * { value: T, index: 0 }
     * ```
     * */
    public getHead = () => {
        if (this._size < 1) throw ReferenceError("Cannot get head of an empty array");
        return {
            value: this._array.get(0),
            index: 0
        };
    }
    /**
     * Returns the value and the index of the tail element as
     * ```typescript
     * { value: T, index: number }
     * ```
     **/
    public getTail = () => {
        if (this._size < 1) throw ReferenceError("Cannot get tail of an empty array");
        return {
            value: this._array.get(this._size - 1),
            index: this._size - 1
        };
    }

    /** Get an element by index — throws if out of bounds */
    public get(i: number) {
        if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
        return this._array.get(i);
    }
    /** Set an element by index — throws if out of bounds */
    public set(i: number, v: T) {
        if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
        this._array.set(i, v);
    }

    /** Get an element by index – returns the second parameter if trying to get out of bounds */
    public getSafe<D>(i: number, defaultValue: D) {
        return this.has(i)
            ? this._array.get(i)
            : defaultValue;
    }
    /** Set an element by index — trying to set out of bounds will be ignored */
    public setSafe(i: number, v: T) {
        if (this.isInBounds(i)) this._array.set(i, v);
    }

    /** Add a value to the end of the list */
    public add(v: T) {

        const newIdx = this._size;
        const size = this._array.size();

        // Standard ArrayList behaviour:
        // If adding the element would go out of bounds for the underlying array,
        // we make more room by creating a copy of the array with twice the capacity
        if (newIdx === size)
            this._array = this._array.copy(size * 2);

        this._array.set(newIdx, v);
        this._size++;

    }

    /** Remove an element from the list by index */
    public remove(i: number) {

        if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);

        // We move right from the removed element's position,
        // shifting all remaining elements one step to the left.
        for (let j = i + 1; j < this._array.size(); j++)
            this._array.set(j - 1, this._array.get(j));

        this._size--;

    }

    /** Removes and returns the last element in the list */
    public popTail = () => {

        if (this._size < 1) throw ReferenceError("Cannot pop from an empty array");

        const value = this.get(this._size - 1);
        this.remove(this._size - 1);

        return value;

    }

    /** Swap two elements in the list by their indices */
    public swapByIndex(aIdx: number, bIdx: number) {
        if (!this.isInBounds(aIdx)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${aIdx}`);
        if (!this.isInBounds(bIdx)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${bIdx}`);
        const a = this._array.get(aIdx);
        const b = this._array.get(bIdx);
        this._array.set(aIdx, b);
        this._array.set(bIdx, a);
    }

    /** Call the given function with all of this list's elements in order */
    public forEach(fn: (value: T, index: number, array: this) => void) {
        for (let i = 0; i < this._size; i++) {
            fn(this.get(i), i, this);
        }
    }

}