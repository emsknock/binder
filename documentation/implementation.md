# Implementation

## Project structure

The testing library used is Jest: the unit tests are named as `<module-name>.test.ts` and are stored next to their target files.

* [/src](../src)
    * [/compression](../src/compression) — Holds the compressor modules
        * [/huffman](../src/compression/huffman) — The Huffman module and its unit tests
        * [/lzw](../src/compression/lzw) — The LZW module and its unit tests
    * [/inflation](../src/inflation) — Holds the inflator modules
        * [/huffman](../src/huffman) — The Huffman module and its unit tests
        * [/lzw](../src/lzw) — The LZW module and its unit tests
    * [/structures](../src/structures) — Holds the data structures used by the compressors
        * [/array-list](../src/structures/array-list) — A standard array list
        * [/fixed-array](../src/structures/fixed-array) — NodeJS doesn't have fixed arrays, so they need to simulated
        * [/priority-queue](../src/structures/priority-queue) — A standard priority queue that can be configured to use either a max or min priority
        * [/dictionary](../src/structures/dictionary) — A standard key-value store: maps items to buckets based on their keys
        * [/bucket](../src/structures/bucket) — A specialised ArrayList used by Dictionaries
    * [/utils](../src/utils) — Holds utility classes that are not datastructures by themselves
        * [/buffer-reader](../src/utils/buffer-reader) — Helps with consuming NodeJS Buffers by keeping an internal movable "read head" on the buffer

## Time and space complexities

## Flaws and improvements
