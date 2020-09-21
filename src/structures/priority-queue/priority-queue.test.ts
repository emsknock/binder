import { PriorityQueue } from ".";

test("size works", () => {
    const maxQueue = new PriorityQueue(true);
    expect(maxQueue.size()).toBe(0);
    maxQueue.push("A", 1);
    expect(maxQueue.size()).toBe(1);
    maxQueue.push("B", 2);
    expect(maxQueue.size()).toBe(2);
    maxQueue.pop();
    expect(maxQueue.size()).toBe(1);
    maxQueue.pop();
    expect(maxQueue.size()).toBe(0);
    const minQueue = new PriorityQueue(false);
    expect(minQueue.size()).toBe(0);
    minQueue.push("A", 1);
    expect(minQueue.size()).toBe(1);
    minQueue.push("B", 2);
    expect(minQueue.size()).toBe(2);
    minQueue.pop();
    expect(minQueue.size()).toBe(1);
    minQueue.pop();
    expect(minQueue.size()).toBe(0);
});

test("max queue: added items are in order of priority", () => {
    const q = new PriorityQueue(true);
    const a = q["_list"]["_array"];
    q.push("A", 0);
    expect(a.get(0)).toEqual({ value: "A", priority: 0 });
    q.push("B", 1);
    expect(a.get(0)).toEqual({ value: "B", priority: 1 });
    q.push("C", 2);
    expect(a.get(0)).toEqual({ value: "C", priority: 2 });
    q.push("D", 3);
    expect(a.get(0)).toEqual({ value: "D", priority: 3 });
});

test("min queue: added items are in order of priority", () => {
    const q = new PriorityQueue(false);
    const a = q["_list"]["_array"];
    q.push("A", 0);
    expect(a.get(0)).toEqual({ value: "A", priority: 0 });
    q.push("B", 1);
    expect(a.get(0)).toEqual({ value: "A", priority: 0 });
    q.push("C", 2);
    expect(a.get(0)).toEqual({ value: "A", priority: 0 });
    q.push("D", 3);
    expect(a.get(0)).toEqual({ value: "A", priority: 0 });
});

test("max queue: popped items come in order of priority", () => {
    const q = new PriorityQueue(true);
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    alphabet.forEach((letter, idx) => q.push(letter, idx));
    for (let i = alphabet.length - 1; i >= 0; i--) {
        expect(q.pop()).toBe(alphabet[i]);
    }
});

test("min queue: popped items come in order of priority", () => {
    const q = new PriorityQueue(false);
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    alphabet.forEach((letter, idx) => q.push(letter, idx));
    for (let i = 0; i < alphabet.length; i++) {
        expect(q.pop()).toBe(alphabet[i]);
    }
});
