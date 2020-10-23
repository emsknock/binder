# Project specification
* Project language: English
* Degree programme: Bachelor's Programme in Computer Science (Finnish)

The program is a file compression utility that creates two compressed versions of a given file: first using Hamming Coding and then the LZW algorithm. It then compares the size of these two versions and picks the smaller one. This information must be supplied to decide which algorithm should be reversed when inflating a compressed file.

## Data structures and algorithms used:
Structures:
* Array list
* Priority queue
* Dictionary (and the associated buckets)
Algorithms:
* Huffman coding
* Lempel Ziv Welch

## Program input
Files passed as UInt8 arrays to the program via the NodeJS Buffer class

## Time and space complexities
* Array list
    * Storage: O(n) space
    * Get: O(1) time
    * Set: O(1) time
    * Add: O(n) time
* Priority queue
    * Storage: O(n) space
    * Add: O(log n) time
    * Pop: O(log n) time
* Dictionary
    * Storage: O(n) space
    * Set: O(1) time
    * Get: O(n) time