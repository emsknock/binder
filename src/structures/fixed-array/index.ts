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

	private _array: T[];
	private _size: number;

	constructor(size: number, defaultValue?: T) {
		if (size < 1)
			throw RangeError(`Array size must be at least 1: ${size}`);
		this._size = size;
		this._array = Array(size).fill(defaultValue);
	}

	/** Guard to block attempts to index the array out of bounds */
	private isInBounds = (i: number) => !(i < 0) && i < this._size;

	/** Get the size of the array. The max index is this value minus one. */
	public size = () => this._size;

	/** Get an element in the array by its index */
	public get(i: number) {
		if (!this.isInBounds(i))
			throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
		return this._array[i];
	}

	/** Set a value in the array by index */
	public set(i: number, v: T) {
		if (!this.isInBounds(i))
			throw ReferenceError(`Index out of bounds for array size ${this._size}: ${i}`);
		this._array[i] = v;
	}

	/**
     * Implement the iteration protocol.
     * This allows an instance of this class to be iterated over using `for of`
     * or the javascript spread operator `...`
     */
	public *[Symbol.iterator]() {
		for (let i = 0; i < this._size; i++) {
			yield this._array[i];
		}
	}

	/**
     * Creates a new fixed size array of the given size and copies all this array's elements
     * to it. Since there must be space for at least all the current elements, the new array
     * must be larger or equal in size to the one being copied.
     * 
     * @param size The size of the new array. Must be greater than or equal to the current size.
     */
	public copy(size: number) {
		if (size < this._size)
			throw RangeError(`Cannot copy array to a smaller size (${size} < ${this._size})`);

		const newArray = new FixedArray<T>(size);
		for (let i = 0; i < this._size; i++)
			newArray.set(i, this._array[i]);

		return newArray;
	}

	/** Apply a transformation function to the given element */
	public changeWithFn(i: number, fn: (oldValue: T) => T) {
		this.set(i, fn(this.get(i)));
	}

}