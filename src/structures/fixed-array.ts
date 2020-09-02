export class FixedArray<T> {

    private array: T[] = [];
    private size: number;

    constructor(size: number) {
        this.size = size;
    }

    private isInBounds = (i: number) => !(i < 0) && i < this.size;

    public get (i: number) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this.size}: ${i}`);
        return this.array[i];
    }

    public set(i: number, v: T) {
        if(!this.isInBounds(i))
            throw ReferenceError(`Index out of bounds for array size ${this.size}: ${i}`);
        this.array[i] = v;
    }

}