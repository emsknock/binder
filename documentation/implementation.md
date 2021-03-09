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
* Array list: O(n) space
    * `.has(i: number)`: O(1) — Simply checks whether the argument is in bounds of the list
    * `.get(i: number)`: O(1) — A table lookup
    * `.set(i: number)`: O(1) — A table write
    * `.add(i: number)`: O(n) — Might have to allocate a new array if the current one is too small
    * `.remove(i: number)`: O(1) — Simply decrements the internal tail pointer
    * `.swapByIndex(aIdx: number, bIdx: number)`: O(1) — Sequential table lookups and writes
    * `.forEach(fn: function)`: O(n) — Function called once with each element
    * `.find(predicate: function)`: O(n) — Function called for each element or until predicate matches
    * `.isEqual(to: ArrayList)`: O(n) — All elements have to be checked
    * `.copy()`: O(n) — All elements have to be copied
    * `.concat()`: O(n * m) — All elements have to be copied and new arrays might have to be allocated
* Priority queue: O(n) space
    * `.push(v: T, priority: number)`: O(log n) — Standard priority queue insert when using a heap
    * `.pop()`: O(log n) — Standard priority queue removal when using a heap
* Dictionary / Bucket: O(n) space
    * `.set(key: ByteList, value: V)`: O(n) — Table lookup followed by a bucket's `ArrayList.find` followed by either `ArrayList.set` or `ArrayList.add`.
    * `.get(key: ByteList)`: O(n) — Table lookup followed by a bucket's `ArrayList.find`

## Flaws and improvements
The Huffman coding wastes space by encoding the Huffman tree as a flattened-out version of the original tree and not as a canonical Huffman tree. Leaf bytes are preceded by a "1" and internal nodes are marked as "0"s. Additional space is wasted by storing these values as whole bytes and not bits — I simply didn't have the time to start implementing a `.readBit()` -method to the BufferReader class.

The LZW algorithm also wastes space by encoding whole bytes, even the original data doesn't use the whole range of 0–255.
