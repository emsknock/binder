# Implementation

## Project structure

The testing library used is Jest: the unit tests are named as `<module-name>.test.ts` and are stored next to their target files.

* [/src](../src)
    * [/compressors](../src/compressors) — Holds the compressor modules
        * [/huffman](../src/compressors/huffman) — The Huffman module and its unit tests
        * [/lzw](../src/compressors/lzw) — The LZW module and its unit tests
    * [/structures](../src/structures) — Holds the data structures used by the compressors
        * [/array-list](../src/structures/array-list) — A standard array list
        * [/fixed-array](../src/structures/fixed-array) — NodeJS doesn't have fixed arrays, so they need to simulated
        * [/priority-queue](../src/structures/priority-queue) — A standard priority queue that can be configured to use either a max or min priority

## Time and space complexities

## Flaws and improvements
