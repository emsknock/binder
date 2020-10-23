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

The main performance indicators for the program will be its speed and the compression ratio.
I'm planning on comparing the program to other compression utilities, probably 7Zip, WinRAR and GZip.
The compression ratio evaluation will be done manually, and the speed can be measured with Node's console.time.