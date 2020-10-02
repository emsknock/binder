# Week 5

Hours worked: 6

* I've written my first code review and submitted the link to it on labtool
    * If the repo goes down, a copy of it is available in this repository in [./peer-review-1-copy.md](./peer-review-1-copy.md)
* Written code is clear and commented — however the new LZW compressor and inflator and the BufferReader classes aren't fully documented yet
* The LZW compressor seems to be working at least with a small example file. The inflator isn't yet tested.
* The current coverage report is available in [the testing document](./testing.md#Coverage)

I really enjoyed writing the peer review. However, I worry it was a bit too suggestion-packed — focusing too much on things to change and improve and not enough on what was already working and well implemented. Since code is such a logical construction, I found it difficult to apply the ["hamburger feedback method"](https://blogs.helsinki.fi/pirttila/files/2008/08/The-Hamburger-method-of-constructive-criticism.pdf) that I usually try to stick to. This will hopefully get easier with experience.

As for my project, I've created the LZW compressor, and even have a first test for it using an example that I found in a YouTube video — a link to it is provided in the test file and will be listed as a source in the implementation document when I finish up. The LZW inflator isn't tested yet, and I have no clue if it works as-is.

I created a new folder for utilities, and created two modules there. The first one, BufferReader, just helps with slicing NodeJS buffers. The second one converts numbers to "chars" and vice versa, since JavaScript—and thus TypeScript—doesn't allow casting between these two types (chars don't even really exist in JS, they're just strings with a single character).