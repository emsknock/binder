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

Files not yet covered:
* compressors/huffman

File                       | % Stmts     | % Branch     | % Funcs     | % Lines     | Uncovered Line #s 
---------------------------|-------------|--------------|-------------|-------------|-------------------
All files                  |   **96.77** |    **93.44** |   **96.43** |      **98** |                   
 structures/array-list     |       100   |        100   |       100   |       100   |                   
 structures/fixed-array    |     89.66   |        100   |     88.89   |     91.67   | 77-78             
 structures/priority-queue |     97.78   |      86.67   |       100   |       100   | 11,42,80          