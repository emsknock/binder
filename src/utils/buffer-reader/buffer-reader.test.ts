import { ArrayList } from "../../structures/array-list";
import { BufferReader } from ".";

const $ = (...arr: number[]) => new BufferReader(Buffer.from(arr));
const toJsArray = (a: ArrayList<number>) => a["_array"]["_array"].filter(n => typeof n !== "undefined");

it("calculates bytes left correctly when removing a byte at a time", () => {

    const content = Array.from({ length: 512 }, () => 0x00);
    const a = $(...content);

    for (let i = content.length; i > 0; i--) {
        expect(a.bytesLeft()).toEqual(i);
        a.readBytesUntil(() => true);
    }

});

it("calculates bytes left correctly when removing different sized slices", () => {

    const content = Array.from({ length: 512 }, () => 0x00);
    const a = $(...content);

    expect(a.bytesLeft()).toEqual(content.length);

    a.readBytesUntil(s => s.size() === 2);
    expect(a.bytesLeft()).toEqual(content.length - 2);

    a.readBytesUntil(s => s.size() === 40);
    expect(a.bytesLeft()).toEqual(content.length - 2 - 40);

    a.readBytesUntil(s => s.size() === 200);
    expect(a.bytesLeft()).toEqual(content.length - 2 - 40 - 200);

});

it("returns slices correctly when in bounds of the buffer", () => {

    const a = $(0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00);

    const r1 = toJsArray(a.readBytesUntil(s => s.size() === 2));
    const r2 = toJsArray(a.readBytesUntil(s => s.size() === 2));
    const r3 = toJsArray(a.readBytesUntil(s => s.size() === 3));
    const r4 = toJsArray(a.readBytesUntil(s => s.size() === 1));
    expect(r1).toEqual([0xDE, 0xAD]);
    expect(r2).toEqual([0xBE, 0xEF]);
    expect(r3).toEqual([0xC0, 0xFF, 0xEE]);
    expect(r4).toEqual([0x00]);

});

it("passes correct slices to the predicate", () => {
    const a = $(0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00);
    a.readBytesUntil(s => {
        if (s.size() === 2) {
            expect(toJsArray(s)).toEqual([0xDE, 0xAD]);
            return true;
        }
        return false;
    });
    a.readBytesUntil(s => {
        if (s.size() === 2) {
            expect(toJsArray(s)).toEqual([0xBE, 0xEF]);
            return true;
        }
        return false;
    });
    a.readBytesUntil(s => {
        if (s.size() === 3) {
            expect(toJsArray(s)).toEqual([0xC0, 0xFF, 0xEE]);
            return true;
        }
        return false;
    });
    a.readBytesUntil(s => {
        if (s.size() === 1) {
            expect(toJsArray(s)).toEqual([0x00]);
            return true;
        }
        return false;
    });
});

it("returns the rest of the buffer when going out of bounds", () => {
    const arr = [0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00];
    const a = $(...arr);
    expect(toJsArray(a.readBytesUntil(() => false))).toEqual(arr);
});