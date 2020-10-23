# Testing

## Running the tests

Install the package:
```
$ npm install
```
Run the tests:
```
$ npm test
```
Create coverage report:
```
$ npm test -- --coverage
```

## Coverage

File                       | % Stmts   | % Branch  | % Funcs   | % Lines   | Uncovered Line #s 
---------------------------|-----------|-----------|-----------|-----------|-------------------
All files                  | **92.81** | **88.43** | **97.22** | **92.52** |                   
 compression/huffman       |     100   |      85   |     100   |     100   |                   
 compression/lzw           |     100   |      85   |     100   |     100   | 108-120           
 inflation/lzw             |     100   |     100   |     100   |     100   |                   
 structures/array-list     |     100   |     100   |     100   |     100   |                   
 structures/bucket         |     100   |     100   |     100   |     100   |                   
 structures/dictionary     |     100   |     100   |     100   |     100   |                   
 structures/fixed-array    |     100   |     100   |     100   |     100   |                   
 structures/priority-queue |   98.15   |      88   |     100   |     100   | 24,74,116,128     
 utils/buffer-reader       |     100   |     100   |     100   |     100   |                   

## Performance

The LZW implementation is apparently **so** unoptimised that the program will hang with files that are larger than 1kb (depending on their entropy).

This project's README | Size (bytes) | Size (%) | Time taken to compress | Time to inflate        |
----------------------|--------------|----------|------------------------|------------------------|
Original file         | 631          | —        | —                      | —                      |
Huffman               | 607          | 96.1     | 13 ms                  | 1 ms                   |
LZW                   | 510          | 80.8     | 16 ms                  | 0.3 ms                 |
MacOS's Zip           | 474          | 75.1     | 105 ms (whole program) | 119 ms (whole program) |

The Huffman implementation runs pretty smoothly, however:

The King James Bible | Size (bytes) | Size (%) | Time taken to compress | Time to inflate |
---------------------|--------------|----------|------------------------|-----------------|
Original file        | 4 332 499    | —        | —                      | —               |
Huffman              | 2 480 633    | 57.2     | 1501 ms                | 110 ms          |