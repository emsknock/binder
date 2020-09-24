import { FixedArray } from "structures/fixed-array";
import { PriorityQueue } from "structures/priority-queue";

interface HuffmanNode {
    freq: number,
    byte: number | null,
    l?: HuffmanNode,
    r?: HuffmanNode
}

export class HuffmanCompressor {

    private _inputBuffer: Buffer;
    private _frequencyMap = new FixedArray(256, 0);
    private _queue = new PriorityQueue<HuffmanNode>(false);
    private _tree: HuffmanNode = { freq: 0, byte: null };
    private _encodingMap = new FixedArray<string>(256, "");

    constructor(buffer: Buffer) {
        if (buffer.length < 1)
            throw Error("Cannot compress empty buffer");
        this._inputBuffer = buffer;
    }

    private fillFrequencyArray = () => this._inputBuffer.forEach(
        (byte) => this._frequencyMap.changeWithFn(byte, count => count + 1)
    );
    private fillNodeQueue = () => this._frequencyMap.forEach(
        (freq, byte) => freq > 0 && this._queue.push({ freq, byte }, freq)
    );
    private fillHuffmanTree = () => {

        do {

            const l = this._queue.pop();
            const r = this._queue.pop();

            const freq = l.freq + r.freq;

            this._queue.push({ freq, byte: null, l, r }, freq);

        } while (this._queue.size() > 1);

        this._tree = this._queue.pop();

    }
    private fillEncodingMap = () => {
        const traverse = (node: HuffmanNode, path: string) => {
            if (node.byte !== null) {
                this._encodingMap.set(node.byte, path);
            } else {
                if(node.l) traverse(node.l, path + "0");
                if(node.r) traverse(node.r, path + "1");
            }
        };
        traverse(this._tree, "");
    }

    public compress() {

        this.fillFrequencyArray();
        this.fillNodeQueue();
        this.fillHuffmanTree();
        this.fillEncodingMap();

    }

}