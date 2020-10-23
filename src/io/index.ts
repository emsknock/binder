import path from "path";
import { promises as fs } from "fs";
import { Argv } from "../main";

import { LzwCompressor } from "../compression/lzw";
import { HuffmanCompressor } from "../compression/huffman";
import { LzwInflator } from "../inflation/lzw";
import { HuffmanInflator } from "../inflation/huffman";

export const doProcessing = async (args: Argv) => {

    const { i, o, huf, lzw, timed } = args;
    const [dir] = args._;

    const inputBuffer = await fs.readFile(path.resolve(i));

    let result: Buffer;
    if (dir === "compress") {
        if (huf || lzw) {
            console.log(`Forced ${huf ? "Huffman" : "LZW"} to compress`);
            const timerLabel = "Time taken";
            if (timed) console.time(timerLabel);
            const algo = huf
                ? new HuffmanCompressor(inputBuffer)
                : new LzwCompressor(inputBuffer);
            result = algo.compress();
            if (timed) console.timeEnd(timerLabel);
            console.log(`Result size (bytes): ${result.length}`);
        } else {
            const hufLabel = "Huffman time taken";
            if (timed) console.time(hufLabel);
            const hufResult = new HuffmanCompressor(inputBuffer).compress();
            if (timed) console.timeEnd(hufLabel);
            const lzwLabel = "LZW time taken";
            if (timed) console.time(lzwLabel);
            const lzwResult = new LzwCompressor(inputBuffer).compress();
            if (timed) console.timeEnd(lzwLabel);
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
            console.log(`Forced ${huf ? "Huffman" : "LZW"} to inflate`);
            const timerLabel = "Time taken";
            if (timed) console.time(timerLabel);
            const algo = huf
                ? new HuffmanInflator(inputBuffer)
                : new LzwInflator(inputBuffer);
            if (timed) console.timeEnd(timerLabel);
            result = algo.inflate();
        } else {
            console.error("Must specify inflator algorithm");
            process.exit(1);
        }
    }

    console.log("Writing");
    fs.writeFile(path.resolve(o), result);

    return;

};