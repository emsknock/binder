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
All files                  | **91.49** | **89.52** | **94.12** | **91.33** |                   
 compressors/huffman       |   64.71   |   58.33   |   81.82   |   62.22   | 38,91-127         
 compressors/lzw           |     100   |     100   |     100   |     100   |                   
 structures/array-list     |     100   |     100   |     100   |     100   |                   
 structures/fixed-array    |     100   |     100   |     100   |     100   |                   
 structures/priority-queue |   98.15   |      88   |     100   |     100   | 24,74,116,128     
 utils/buffer-reader       |     100   |     100   |     100   |     100   |                   
 utils/bytes-chars         |      75   |     100   |      50   |     100   |                   

## Performance

The main performance indicators for the program will be its speed and the compression ratio.
I'm planning on comparing the program to other compression utilities, probably 7Zip, WinRAR and GZip.
The compression ratio evaluation will be done manually, and the speed can be measured with Node's console.time.
The timer will be implemented at a later point in time, and will be activated with a command line argument.