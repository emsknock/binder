/**
 * A basic array with a fixed size.
 * 
 * JS arrays are dynamic by default, so a custom implementation is required to fulfill
 * the course requirements.
 * 
 * This implementation uses a JS array under the hood, which is explicitly allowed.
 * 
 */
export class FixedArray<T> {

    private _array: T[] = [];
    private _size: number;

    constructor(size: number) {
        this._size = size;
    }

    /** Guard to block attempts to index the array out of bounds */
    private isInBounds = (i: number) => !(i < 0) && i < this._size;

    /** Get the size of the array. The max index is this value minus one. */
    public size = () => this._size;

    /** Get an element in the array by its index */
    public get (i: number) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
        return this._array[i];
    }

    /** Set a value in the array by index */
    public set(i: number, v: T) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
        this._array[i] = v;
    }

    public *[Symbol.iterator]() {
        for(let i = 0; i < this._size; i++) {
            yield this._array[i];
        }
    }

}