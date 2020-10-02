import { BufferReader } from ".";

const $ = (...arr: number[]) => new BufferReader(Buffer.from(arr));
const join = String.fromCharCode;

it("calculates bytes left correctly when removing a byte at a time", () => {

    const content = Array.from({ length: 512 }, () => 0x00);
    const a = $(...content);

    for (let i = content.length; i > 0; i--) {
        expect(a.bytesLeft()).toEqual(i);
        a.readUntil(() => true);
    }

});

it("calculates bytes left correctly when removing different sized slices", () => {

    const content = Array.from({ length: 512 }, () => 0x00);
    const a = $(...content);

    expect(a.bytesLeft()).toEqual(content.length);

    a.readUntil(s => s.length === 2);
    expect(a.bytesLeft()).toEqual(content.length - 2);
    
    a.readUntil(s => s.length === 40);
    expect(a.bytesLeft()).toEqual(content.length - 2 - 40);

    a.readUntil(s => s.length === 200);
    expect(a.bytesLeft()).toEqual(content.length - 2 - 40 - 200);

});

it("returns slices correctly when in bounds of the buffer", () => {

    const a = $(0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00);
    expect(a.readUntil(s => s.length === 2)).toEqual(join(0xDE, 0xAD));
    expect(a.readUntil(s => s.length === 2)).toEqual(join(0xBE, 0xEF));
    expect(a.readUntil(s => s.length === 3)).toEqual(join(0xC0, 0xFF, 0xEE));
    expect(a.readUntil(s => s.length === 1)).toEqual(join(0x00));

});

it("passes correct slices to the predicate", () => {
    const a = $(0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00);
    expect(a.readUntil(s => s === join(0xDE, 0xAD))).toBe(join(0xDE, 0xAD));
    expect(a.readUntil(s => s === join(0xBE, 0xEF))).toBe(join(0xBE, 0xEF));
    expect(a.readUntil(s => s === join(0xC0, 0xFF, 0xEE))).toBe(join(0xC0, 0xFF, 0xEE));
    expect(a.readUntil(s => s === join(0x00))).toBe(join(0x00));
});

it("returns the rest of the buffer when going out of bounds", () => {
    const arr = [0xDE, 0xAD, 0xBE, 0xEF, 0xC0, 0xFF, 0xEE, 0x00];
    const a = $(...arr);
    expect(a.readUntil(() => false)).toEqual(join(...arr));
});