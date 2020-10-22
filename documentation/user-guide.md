# User Guide

Requirements: Node 12+, NPM 6+

# Installation

Install:
```bash
$ npm install
```
Build:
```bash
$ npm run-script build
```
Run:
```bash
$ node build/main.js
```

# Usage

Compress a file:
```bash
$ node build/main.js compress -i <INPUT_FILE> -o <OUTPUT_FILE>
```
Inflate a file:
```bash
$ node build/main.js inflate -i <INPUT_FILE> -o <OUTPUT_FILE>
```