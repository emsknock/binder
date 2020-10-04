import { ArrayList } from "structures/array-list";
import { ByteList } from "types/byte-list";
import { Dictionary } from ".";

const list = (...a: number[]): ByteList => {
    const l = new ArrayList<number>();
    a.forEach(n => l.add(n));
    return l;
};

test("can set a value and retrieve it", () => {
    const d = new Dictionary<number>();
    const k = list(0, 7, 1, 2);
    d.set(k, 5);
    expect(d.get(k)).toBe(5);
});

test("can set multiple values with same length and retrieve them all", () => {
    const d = new Dictionary<number>();
    const k1 = list(0, 7, 1, 2);
    const k2 = list(0, 1, 0, 3);
    const k3 = list(3, 0, 0, 3);
    d.set(k1, 7);
    d.set(k2, 1);
    d.set(k3, 3);
    expect(d.get(k1)).toBe(7);
    expect(d.get(k2)).toBe(1);
    expect(d.get(k3)).toBe(3);
});

test("can overwrite values", () => {
    const d = new Dictionary<number>();
    const k = list(0, 7, 1, 2);
    d.set(k, 7);
    expect(d.get(k)).toBe(7);
    d.set(k, 10);
    expect(d.get(k)).toBe(10);
});