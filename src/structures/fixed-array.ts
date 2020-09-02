export class FixedArray<T> {

    private _array: T[] = [];
    private _size: number;

    constructor(size: number) {
        this._size = size;
    }

    private isInBounds = (i: number) => !(i < 0) && i < this._size;

    public size = () => this._size;

    public get (i: number) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
        return this._array[i];
    }

    public set(i: number, v: T) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
        this._array[i] = v;
    }

}