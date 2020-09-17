# Week 3

Hours worked: 5

- Work on implementing core functionality has continued. I started with implementing the priority queue, since JS doesn't have a native implementation of it.
- Comprehensive unit testing of the code. Latest report available in [the testing document](./testing.md).
- ESLint in use as a code quality tool.

This was an incredibly busy week for me, and I had to make some compromises on how I spent my time. I managed to decide on an "architecture" for the compressors, however: to make unit testing easier and more uniform, both the Huffman compressor and the LZW compressor will be classes with constructors that accept a buffer as input and `compress()` methods that give compressed versions of those buffers as output. The Huffman compressor now has a private method to create a Huffman tree, but I haven't had the time to write tests for it yet. I can already guess there'll be a problem with it using my PriorityQueue implementation, as the Huffman algorithm uses a min-priority queue, while my PriorityQueue is a max-priority one. It should be an easy fix, but I'll have to modify my tests, too. Since I haven't yet made a draft of my LZW implementation, I'm not sure if it needs a priority queue, and—should that be the case—which one. To prepare for LZW needing a max-queue, I might just go ahead and make my queue implementation accept a boolean in the constructor to signal min or max.