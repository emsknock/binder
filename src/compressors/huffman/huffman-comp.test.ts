import { HuffmanCompressor } from ".";

it("counts byte frequencies correctly", () => {
    const h = new HuffmanCompressor(Buffer.from("DEADBEEF01010101", "hex"));
    h["fillFrequencyArray"]();
    expect(h["_frequencyMap"].get(0xde)).toBe(1);
    expect(h["_frequencyMap"].get(0xad)).toBe(1);
    expect(h["_frequencyMap"].get(0xbe)).toBe(1);
    expect(h["_frequencyMap"].get(0xef)).toBe(1);
    expect(h["_frequencyMap"].get(0x01)).toBe(4);
    expect(h["_frequencyMap"].get(0x00)).toBe(0);
});

it("fills node queue correctly", () => {
    const h = new HuffmanCompressor(Buffer.from("DEADBEEF01010101", "hex"));
    h["fillFrequencyArray"]();
    h["fillNodeQueue"]();
    const q = h["_queue"];
    expect([0xde, 0xad, 0xbe, 0xef]).toContain(q.pop().byte);
    expect([0xde, 0xad, 0xbe, 0xef]).toContain(q.pop().byte);
    expect([0xde, 0xad, 0xbe, 0xef]).toContain(q.pop().byte);
    expect([0xde, 0xad, 0xbe, 0xef]).toContain(q.pop().byte);
    expect(q.pop().byte).toBe(0x01);
});

it("creates huffman tree correctly", () => {
    const h = new HuffmanCompressor(Buffer.from("DEADBEEF01010101", "hex"));
    h["fillFrequencyArray"]();
    h["fillNodeQueue"]();
    h["fillHuffmanTree"]();
    const root = h["_root"];
    expect(root.l!.r!.r!.byte).toBe(0xde);
    expect(root.l!.l!.r!.byte).toBe(0xad);
    expect(root.l!.l!.l!.byte).toBe(0xbe);
    expect(root.l!.r!.l!.byte).toBe(0xef);
});

it("fills encoding map correctly", () => {
    const h = new HuffmanCompressor(Buffer.from("DEADBEEF01010101", "hex"));
    h["fillFrequencyArray"]();
    h["fillNodeQueue"]();
    h["fillHuffmanTree"]();
    h["fillEncodingMap"]();
    const map = h["_encodingMap"];
    expect(map.get(0x01)).toBe("1");
    expect(map.get(0xde)).toBe("011");
    expect(map.get(0xad)).toBe("001");
    expect(map.get(0xbe)).toBe("000");
    expect(map.get(0xef)).toBe("010");
});