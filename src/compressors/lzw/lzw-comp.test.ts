import { LzwCompressor } from ".";

const $ = (array: number[]) => (new LzwCompressor(Buffer.from(array))).compress();
const buff = (array: number[]) => Buffer.from(array);

it("throws when given an empty buffer", () => {
    expect(() => $([])).toThrow();
});

it("compresses small example correctly", () => {

    // Example from the YouTube video "The Beauty of Lempel-Ziv Compression"
    // Published by "Art of the Problem" on 12. Dec. 2018,
    // viewed on 2. Oct. 2020,
    // at https://youtube.com/watch?v=RV5aUr8sZD0

    const [A, B] = [0x00, 0x01];
    const arr = [A, A, B, A, B, B, A, B, B, A, A, B, A];
    const com = [0, A, 1, B, 2, B, 3, A, 2, A];
    expect($(arr)).toEqual(buff(com));

});