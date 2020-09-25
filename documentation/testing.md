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

File                       | % Stmts   | % Branch  | % Funcs  | % Lines   | Uncovered Line #s 
---------------------------|-----------|-----------|----------|-----------|-------------------
All files                  | **86.84** | **82.83** | **88.1** | **86.54** |                   
 compressors/huffman       |    64.71  |    58.33  |   81.82  |    62.22  | 38,91-127         
 structures/array-list     |    89.29  |    77.78  |      80  |    90.48  | 58-62,120-121     
 structures/fixed-array    |      100  |      100  |     100  |      100  |                   
 structures/priority-queue |    98.15  |       88  |     100  |      100  | 24,74,116,128     
---------------------------|-----------|-----------|----------|-----------|-------------------