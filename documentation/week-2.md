# Week 2

Hours worked: 10

- Written code is commented, most methods have JSDoc style documentation comment. Since Typescript handles generating function signatures etc, they're not included in the documentation unless there's some reason to disambiguate a parameter's purpose.
- The Huffman algorithm is based on a priority queue, and to my knowledge JS doesn't have a priority queue implementation in its stdlib. Thus I started with creating a priority queue, and am now moving on to implementing Huffman with it.
- I'm using Jest to run unit tests. Instructions on running the tests, creating a coverage report, and the **current coverage report** is in [the testing document](./testing.md).
- I've configured ESLint to ensure a consistent coding style.

Like I suspected in last week's report, the priority queue implementation had some glaring problems. True to the quintessential programming experience, a lot of time was sunk to debugging errors that basically amounted to typos. The priority queue is represented as an array, and the class's `rChild` method always returned the same value, because I had written a '1' instead of an 'i'. I had also touched up my understanding of the heap structure from Antti Laaksonen's Data Structures and Algorithms -book, but the book starts indexing arrays in its heap examples from 1, not 0. Both mistakes took a good while to spot — thankfully they were quick to fix after that.