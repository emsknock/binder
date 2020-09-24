import { FixedArray } from "structures/fixed-array";
import { PriorityQueue } from "structures/priority-queue";

interface HuffmanNode {

    freq: number,
    
    // Null iff this node is not a leaf
    byte: number | null,

    // Notice that non-leaf Huffman nodes never have only one child set:
    // either both exist or the node is a leaf
    l?: HuffmanNode,
    r?: HuffmanNode

}

export class HuffmanCompressor {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    /** Map bytes to their count in the input buffer */
    private _frequencyMap = new FixedArray(256, 0);

    /** The queue used in building the Huffman tree */
    private _queue = new PriorityQueue<HuffmanNode>(false);

    /** The root node of the Huffman tree */
    private _root: HuffmanNode = { freq: 0, byte: null };

    /** Maps bytes to their Huffman encodings (variable-sized strings of bits) */
    private _encodingMap = new FixedArray<string>(256, "");

    constructor(buffer: Buffer) {
        if (buffer.length < 1)
            throw Error("Cannot compress empty buffer");
        this._inputBuffer = buffer;
    }

    private fillFrequencyArray = () => this._inputBuffer.forEach(
        // Increment this byte's count in the map
        (byte) => this._frequencyMap.changeWithFn(byte, count => count + 1)
    );
    private fillNodeQueue = () => this._frequencyMap.forEach(
        // Skip pushing bytes that do not occur in the buffer
        // This prevents the tree from having leafs with 0 frequency
        (freq, byte) => freq > 0 && this._queue.push({ freq, byte }, freq)
    );
    private fillHuffmanTree = () => {

        // Standard Huffman tree build

        do {

            const l = this._queue.pop();
            const r = this._queue.pop();

            const freq = l.freq + r.freq;

            this._queue.push({ freq, byte: null, l, r }, freq);

        } while (this._queue.size() > 1);

        this._root = this._queue.pop();

    }
    private fillEncodingMap = () => {
        // A recursive function to build the variable-sized strings of bits for the encoding map
        const traverse = (node: HuffmanNode, path: string) => {
            if (node.byte !== null) {
                // Since the byte is not null, this is a leaf.
                this._encodingMap.set(node.byte, path);
            } else {
                // Since the byte is null, this is not a leaf.
                // Like noted in the HuffmanNode interface specification,
                // if a node is not a leaf both of its children will always exist.
                if(node.l) traverse(node.l, path + "0");
                if(node.r) traverse(node.r, path + "1");
            }
        };
        traverse(this._root, "");
    }

    public compress() {

        // This whole algorithm could exist as a single long function,
        // but I've decided to implement it as a class with separate steps to make testing easier

        this.fillFrequencyArray();
        this.fillNodeQueue();
        this.fillHuffmanTree();
        this.fillEncodingMap();



    }

}