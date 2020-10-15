import { readFile, writeFile } from "fs/promises";

import { LzwCompressor } from "../compression/lzw";
import { LzwInflator } from "../inflation/lzw";
import { HuffmanCompressor } from "../compression/huffman";
// import { HuffmanInflator } from "../inflation/huffman";

export const process = async (dir: "compress" | "inflate", iPath: string, oPath: string) => {

    const inputBuffer = await readFile(iPath);

    if (dir === "compress") {

        const huf = new HuffmanCompressor(inputBuffer);
        const lzw = new LzwCompressor(inputBuffer);

        // Might use worker processes to do these in parallel in the future
        const hufResult = huf.compress();
        const lzwResult = lzw.compress();

        const shorter = lzwResult.length < hufResult.length ? lzwResult : hufResult;

        writeFile(oPath, shorter);

    } else {

    }

}