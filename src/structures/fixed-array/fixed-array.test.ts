import { FixedArray } from ".";

test("accepts a size", () => {
	const arr = new FixedArray(5);
	expect(arr.size()).toBe(5);
});

test("holds elements", () => {
	const arr = new FixedArray(2);
	arr.set(0, "Hello");
	arr.set(1, "World");
	expect(arr.get(0)).toBe("Hello");
	expect(arr.get(1)).toBe("World");
});

test("can create copies", () => {
	const arr = new FixedArray(2);
	arr.set(0, "Hello");
	arr.set(1, "World");
	const cp = arr.copy(3);
	expect(cp.size()).toBe(3);
	for (const el of arr)
		expect(cp["_array"].includes(el));
});

test("doesn't accept initial size of less than one", () => {
	expect(() => new FixedArray(0)).toThrowError(RangeError);
});

test("doesn't allow indexing out of bounds", () => {
	const arr = new FixedArray(5);
	expect(() => arr.get(-1)).toThrowError(ReferenceError);
	expect(() => arr.get(99)).toThrowError(ReferenceError);
	expect(() => arr.set(-1, 5)).toThrowError(ReferenceError);
	expect(() => arr.set(99, 5)).toThrowError(ReferenceError);
});

test("doesn't allow creating a smaller copy", () => {
	expect(() => (new FixedArray(5)).copy(4)).toThrowError(RangeError);
});

test("default value is set", () => {
	const arr = new FixedArray(50, "test");
	for(let i = 0; i < 50; i++)
		expect(arr.get(i)).toBe("test");
});

test("change method works", () => {
	const arr = new FixedArray(50, 0);
	for(let i = 0; i < 50; i++)
		arr.changeWithFn(i, () => i);
	for(let i = 0; i < 50; i++)
		expect(arr.get(i)).toBe(i);
});