# Week 6

Hours worked: 7

* I've written my second code review and submitted the link to it on labtool
    * If the repo goes down, a copy of it is available in this repository in [./peer-review-2-copy.md](./peer-review-2-copy.md)
* The current coverage report is available in [the testing document](./testing.md#Coverage)

I implemented some of the changes suggested to me in the peer review, didn't get to all of them yet though. My main focus this week was to test the LZW inflator and refactor the LZW compressor code as to use a custom Dictionary data-structure instead of JS's own Map object, and to use the custom ArrayList instead of relying on mutating string instances (which I've understood to be against the course rules — strings are a data structure too after all). Both goals have been met. Next up is refactoring the LZW inflator and creating the Huffman inflator. After that I just need to create the application interface and logic to work with the filesystem — both are fortunately quick and simple to implement (famous last words).