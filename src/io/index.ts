import path from "path";
import { promises as fs } from "fs";

import { LzwCompressor } from "../compression/lzw";
import { HuffmanCompressor } from "../compression/huffman";
import { LzwInflator } from "../inflation/lzw";

export const doProcessing = async (dir: "compress" | "inflate", iPath: string, oPath: string) => {

    const inputBuffer = await fs.readFile(path.resolve(iPath));

    if (dir === "compress") {

        const huf = new HuffmanCompressor(inputBuffer);
        const lzw = new LzwCompressor(inputBuffer);

        // Might use worker processes to do these in parallel in the future
        const hufResult = huf.compress();
        const lzwResult = lzw.compress();

        const shorter = lzwResult.length < hufResult.length ? lzwResult : hufResult;

        fs.writeFile(path.resolve(oPath), shorter);

    } else {

        const lzw = new LzwInflator(inputBuffer);

        const lzwResult = lzw.inflate();

        fs.writeFile(path.resolve(oPath), lzwResult);

    }

    return;

};