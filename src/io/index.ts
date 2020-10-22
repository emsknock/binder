import path from "path";
import { promises as fs } from "fs";
import { Argv } from "../main";

import { LzwCompressor } from "../compression/lzw";
import { HuffmanCompressor } from "../compression/huffman";
import { LzwInflator } from "../inflation/lzw";
import { HuffmanInflator } from "../inflation/huffman";

export const doProcessing = async (args: Argv) => {

    const { i, o, huf, lzw } = args;
    const [dir] = args._;

    const inputBuffer = await fs.readFile(path.resolve(i));

    let result: Buffer;
    if (dir === "compress") {
        if (huf || lzw) {
            const algo = huf
                ? new HuffmanCompressor(inputBuffer)
                : new LzwCompressor(inputBuffer);
            result = algo.compress();
        } else {
            const hufResult = new HuffmanCompressor(inputBuffer).compress();
            const lzwResult = new LzwCompressor(inputBuffer).compress();
            console.log(`Huffman (bytes): ${hufResult.length}`);
            console.log(`LZW (bytes):     ${lzwResult.length}`);
            const isHufShorter = hufResult.length < lzwResult.length;
            console.log(`Using ${isHufShorter ? "Huffman" : "LZW"} to compress`);
            result = isHufShorter
                ? hufResult
                : lzwResult;
        }
    } else {
        if (huf || lzw) {
            const algo = huf
                ? new HuffmanInflator(inputBuffer)
                : new LzwInflator(inputBuffer);
            result = algo.inflate();
        } else {
            console.error("Must specify inflator algorithm");
            process.exit(1);
        }
    }

    fs.writeFile(path.resolve(o), result);

    return;

};