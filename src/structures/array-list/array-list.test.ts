import { ArrayList } from ".";

test("uses default size", () => {
    const list = new ArrayList();
    expect(list["_array"].size()).toBe(256);
});

test("accepts a size", () => {
    const list = new ArrayList(5);
    expect(list["_array"].size()).toBe(5);
    expect(list.size()).toBe(0);
});

test("can add elements when there's space", () => {
    const list = new ArrayList<string>(5);
    list.add("Hello World");
    expect(list.get(0)).toBe("Hello World");
});

test("cannot get out of bounds", () => {
    expect(() => (new ArrayList(1)).get(-1)).toThrowError(ReferenceError);
    expect(() => (new ArrayList(1)).get(99)).toThrowError(ReferenceError);
});

test("cannot set out of bounds", () => {
    expect(() => (new ArrayList(1)).set(-1, 1)).toThrowError(ReferenceError);
    expect(() => (new ArrayList(1)).set(99, 1)).toThrowError(ReferenceError);
});

test("can set elements by index", () => {
    const list = new ArrayList(4);
    [1, 2, 3, 4].forEach(n => list.add(n));
    list.set(0, 5);
    expect(list.get(0)).toBe(5);
});

test("dynamic memory allocation works", () => {
    const list = new ArrayList(1);
    list.add("Testing");
    expect(list.size()).toBe(1);
    expect(list["_array"].size()).toBe(1);
    list.add("Testing");
    expect(list.size()).toBe(2);
    expect(list["_array"].size()).toBe(2);
    list.add("Testing");
    expect(list.size()).toBe(3);
    expect(list["_array"].size()).toBe(4);
    [1, 2, 3, 4].forEach(() => list.add("Testing"));
    expect(list.size()).toBe(7);
    expect(list["_array"].size()).toBe(8);
});

test("head and tail getters work", () => {
    const list = new ArrayList(5);
    list.add("Hello");
    list.add("World");
    expect(list.getHead()).toEqual({ value: "Hello", index: 0 });
    expect(list.getTail()).toEqual({ value: "World", index: 1 });
});

test("can't get head or tail from empty list", () => {
    expect(() => (new ArrayList(1)).getHead()).toThrowError(ReferenceError);
    expect(() => (new ArrayList(1)).getTail()).toThrowError(ReferenceError);
});

test("head and tail getters work when head and tail reference the same element", () => {
    const list = new ArrayList(1);
    list.add("Hello World");
    expect(list.getHead()).toEqual(list.getTail());
});

test("can remove elements", () => {
    const list = new ArrayList(4);
    [1, 2, 3, 4].forEach(n => list.add(n));
    list.remove(0);
    expect(list.size()).toBe(3);
    [0, 1, 2].forEach(i => expect(list.get(i)).toBe(i + 2));
});

test("can't remove out of bounds", () => {
    const list = new ArrayList(4);
    [1, 2, 3, 4].forEach(n => list.add(n));
    expect(() => list.remove(-1)).toThrowError(ReferenceError);
    expect(() => list.remove(99)).toThrowError(ReferenceError);
});

test("can't remove from empty array", () => {
    const list = new ArrayList(1);
    expect(() => list.remove(0)).toThrowError(ReferenceError);
});

test("can swap by index", () => {
    const list = new ArrayList(4);
    [1, 2, 3, 4].forEach(n => list.add(n));
    list.swapByIndex(0, 3);
    expect(list.get(0)).toBe(4);
    expect(list.get(3)).toBe(1);
    list.swapByIndex(1, 2);
    expect(list.get(1)).toBe(3);
    expect(list.get(2)).toBe(2);
});

test("can't swap out of bounds", () => {
    const list = new ArrayList(2);
    list.add(1);
    list.add(2);
    expect(() => list.swapByIndex(0, 99)).toThrowError(ReferenceError);
    expect(() => list.swapByIndex(-1, 0)).toThrowError(ReferenceError);
});

test("can pop tail", () => {
    const list = new ArrayList(4);
    [1, 2, 3, 4].forEach(n => list.add(n));
    const tail = list.popTail();
    expect(tail).toBe(4);
    expect(list.size()).toBe(3);
});

test("can't pop tail from empty list", () => {
    expect(() => (new ArrayList(1)).popTail()).toThrowError(ReferenceError);
});

test("safe getter returns element at first parameter's index when in bounds", () => {
    const list = new ArrayList(1);
    list.add(1337);
    expect(list.getSafe(0, "NO")).toBe(1337);
});

test("safe getter returns second parameter when out of bounds", () => {
    const list = new ArrayList(1);
    list.add(1337);
    expect(list.getSafe(1, "NO")).toBe("NO");
});

test("safe setter doesn't throw when setting out of bounds", () => {
    const list = new ArrayList(1);
    list.add(1337);
    expect(() => list.setSafe(5, 0)).not.toThrow();
});

test("safe setter sets the specified element when in bounds", () => {
    const list = new ArrayList(1);
    list.add(1337);
    expect(list.setSafe(0, 0)).toBeUndefined();
    expect(list.get(0)).toBe(0);
});

test("find returns the first that matches the predicate", () => {
    const list = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(n => list.add(n));
    expect(list.find(n => n % 3 === 0)).toEqual(3);
    expect(list.find(n => n % 2 === 0)).toEqual(2);
});

test("find returns undefined if predicate doesn't match", () => {
    const list = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(n => list.add(n));
    expect(list.find(() => false)).toBeUndefined();
});

test("isEqual returns true when the parameter matches", () => {
    const list1 = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(n => list1.add(n));
    const list2 = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(n => list2.add(n));
    expect(list1.isEqual(list2)).toBe(true);
});

test("isEqual returns false when the parameter doesn't match", () => {
    const list1 = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(n => list1.add(n));
    const list2 = new ArrayList<number>(8);
    [1, 2, 3, 4, 5, 6, 7, 9].forEach(n => list2.add(n));
    expect(list1.isEqual(list2)).toBe(false);
});