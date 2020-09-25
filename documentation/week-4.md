# Week 4

Hours worked: 6

* Testing is documented and the implementation document has the (planned) eventual project structure written out
* The testing documentation now includes my plans for performance testing (i.e. compression ratio evaluation and speed measurements).
* Like I wrote in a previous weekly report, I started with writing the priority queue and the structures it needs. The Huffman compressor is complete save for building the code book that'll be used when inflating the compressed data.

Like I ruminated in the last report, the Huffman algorithm needed my priority queue to use min-priority instead of max-priority, like I originally wrote it. The priority queue now accepts a boolean `isMaxQueue` in its constructor to switch between these two queue types. Its unit tests now test both min and max behaviour.

Like stated above, the Huffman compressor now creates a Huffman tree and can create a NodeJS Buffer object that holds the compressed version of the input. I'm currently researching ways of saving the code book so that the compressed data can actually be inflated again. On the other hand, maybe I should prioritise the compression part of the project and move on to implementing LZW.