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
 compressors/huffman       |   64.71   |   58.33   |   81.82   |   62.22   | 38,91-127         
 compressors/lzw           |     100   |     100   |     100   |     100   |                   
 inflators/lzw             |   95.83   |      50   |     100   |   95.45   | 15                
 structures/array-list     |   98.61   |   96.77   |     100   |     100   | 137               
 structures/bucket         |     100   |     100   |     100   |     100   |                   
 structures/dictionary     |   92.86   |      90   |     100   |   91.67   | 23                
 structures/fixed-array    |     100   |     100   |     100   |     100   |                   
 structures/priority-queue |   98.15   |      88   |     100   |     100   | 24,74,116,128     
 utils/buffer-reader       |     100   |     100   |     100   |     100   |                   
 utils/bytes-chars         |      75   |     100   |      50   |     100   |                   

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