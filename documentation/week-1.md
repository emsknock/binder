# Week 1

Hours worked: 7

- [x] I have the topic and the programming language decided, both greenlit by Saska.
- [x] I've created the documentation files, and written the specification file
- [x] I've enabled issues in the repository
- [x] I've added a testing library

I started the project by deciding an initial project structure: all common data structures will be inside a `/structures` directory, all the files relating to the actual Hamming Code and LZW algorithms will be inside their own `/compressors/hamming` and `/compressors/lzw` directories. The main program logic will be as simple as possible and reside in a `/main.ts` file.

I've already written three of the data structures I know I'm going to use. I haven't written tests for the priority queue yet, so it might have some fundamental errors in its implementation. The typing is valid according to TypeScript, though, which is a good sign.

I'm going to implement the two algorithms one-by-one. I'll write the Hamming Coding portion first, as that's the one I understand thoroughly already. After that I'll tackle LZW.

It would be nice to make a simple GUI for the program, but I will make a CLI *first* and keep a GUI as a nice-to-have-if-I-have-the-time feature. If I have the time to make a GUI, I'll probably resort to using Electron to run a simple React app — I know this is definitely overkill, but that combo is the one I have the most experience in, so that's the solution I create the fastest and this is not a course on how to build GUIs.