import { FixedArray } from "structures/fixed-array";
import { PriorityQueue } from "structures/priority-queue";

type HuffmanNode =
    { freq: number, byte: number } |
    { freq: number, l: HuffmanNode, r?: HuffmanNode } |
    { freq: number, r: HuffmanNode, l?: HuffmanNode };

export class HuffmanCompressor {

    private _buffer: Buffer;
    private _queue = new PriorityQueue<HuffmanNode>(false);

    /*
     * A map of bytes to their frequencies.
     * The index is the byte value and the stored value at that index is that byte's frequency in the buffer.
     **/
    private _frequencyMap = new FixedArray(256, 0);

    constructor(buffer: Buffer) {
        if (buffer.length < 1)
            throw Error("Cannot compress empty buffer");
        this._buffer = buffer;
    }

    private fillFrequencyArray = () => this._buffer.forEach(
        (byte) => this._frequencyMap.changeWithFn(byte, count => count + 1)
    );
    private fillNodeQueue = () => this._frequencyMap.forEach(
        (freq, byte) => this._queue.push({ freq, byte }, freq)
    );

    private createHuffmanTree = () => {

        do {

            const a = this._queue.pop();
            const b = this._queue.pop();

            const freq = a.freq + b.freq;

            this._queue.push({ freq, l: b, r: a }, freq);

        } while (this._queue.size() > 1);

        return this._queue.pop();

    }

    public compress() {
        this.fillFrequencyArray();
        this.fillNodeQueue();
        const root = this.createHuffmanTree();
    }

}