import { PriorityQueue } from ".";

test("size works", () => {
    const q = new PriorityQueue();
    expect(q.size()).toBe(0);
    q.push("A", 1);
    expect(q.size()).toBe(1);
    q.push("B", 2);
    expect(q.size()).toBe(2);
    q.pop();
    expect(q.size()).toBe(1);
    q.pop();
    expect(q.size()).toBe(0);
});

test("added items are in order of priority", () => {
    const q = new PriorityQueue();
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

test("popped items come in order of priority", () => {
    const q = new PriorityQueue();
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    alphabet.forEach((letter, idx) => q.push(letter, idx));
    for (let i = alphabet.length - 1; i >= 0; i--) {
        expect(q.pop()).toBe(alphabet[i]);
    }
});
