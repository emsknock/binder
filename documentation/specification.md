# Project specification
* Project language: English
* Degree programme: Bachelor's Programme in Computer Science (Finnish)

The program is a file compression utility that creates two compressed versions of a given file: first using Hamming Coding and then the LZW algorithm. It then compares the size of these two versions, picks the smaller one, and appends a bit to the end of the compressed data to signal which one it used. This flag bit is used to decide which algorithm should be reversed when inflating a compressed file.
