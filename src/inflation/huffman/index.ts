import { ArrayList } from "../../structures/array-list";
import { Dictionary } from "../../structures/dictionary";
import { BufferReader } from "../../utils/buffer-reader";

interface HuffmanNode {

    byte: number | null,
    
    l?: HuffmanNode,
    r?: HuffmanNode,

}

export class HuffmanInflator {
    
    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _tree: HuffmanNode = { byte: null };

    private _codebook = new Dictionary<number>();

    private _bitArray: ArrayList<0 | 1>;

    constructor(buffer: Buffer) {

        if (buffer.length < 1)
            throw Error("Cannot inflate empty buffer");

        this._inputBuffer = buffer;
        this._bitArray = new ArrayList(buffer.length * 8);

    }

    private fillTree = () => {
        const reader = new BufferReader(this._inputBuffer);
        const stack = new ArrayList<HuffmanNode>();
        reader.readBytesUntil(s => s.size() === 1); // Skip preamble size byte
        do {
            const isLeaf = reader.readBytesUntil(s => s.size() === 1).get(0) === 1;
            const byte = reader.readBytesUntil(s => s.size() === 1).get(0);
            if (isLeaf) {
                stack.add({ byte });
            } else {

                if(stack.size() === 1) break;
                
                const r = stack.popTail();
                const l = stack.popTail();
                stack.add({ byte: null, l, r });

            }
        } while(reader.bytesLeft() > 0);

        this._tree = stack.popTail();
    }

    private fillCodebook = () => {
        const traverse = (node: HuffmanNode, path: ArrayList<0 | 1>) => {
            if (node.byte !== null) {
                this._codebook.set(path, node.byte);
            } else {
                if (node.l) traverse(node.l, path.copy().add(0));
                if (node.r) traverse(node.r, path.copy().add(1));
            }
        };
        traverse(this._tree, new ArrayList());
    }

    public inflate() {

        this.fillTree();
        this.fillCodebook();

        this._inputBuffer.forEach(
            (byte, idx) => {
                if (idx < this._inputBuffer[0] + 1) return;
                this._bitArray.add((byte >> 7 & 1) as 0 | 1);
                this._bitArray.add((byte >> 6 & 1) as 0 | 1);
                this._bitArray.add((byte >> 5 & 1) as 0 | 1);
                this._bitArray.add((byte >> 4 & 1) as 0 | 1);
                this._bitArray.add((byte >> 3 & 1) as 0 | 1);
                this._bitArray.add((byte >> 2 & 1) as 0 | 1);
                this._bitArray.add((byte >> 1 & 1) as 0 | 1);
                this._bitArray.add((byte >> 0 & 1) as 0 | 1);
            }
        );

        const rawOut = new ArrayList<number>();
        let sliceIdx = 0;

        // I've spent like upwards of 7 hours trying to get this working now.
        // Finally I found the bug, and I'm just slapping on a label to fix it.
        // This whole nested do-while block should probably be refactored into
        // something else, but I'm not spending another 7 hours of my life to do that.
        buildStep:
        do {

            const slice = new ArrayList<0 | 1>();

            do {

                if (sliceIdx === this._bitArray.size()) break buildStep;

                slice.add(this._bitArray.get(sliceIdx));
                sliceIdx++;

            } while (!this._codebook.has(slice));

            rawOut.add(this._codebook.get(slice));

        } while (sliceIdx < this._bitArray.size());

        const output = Buffer.alloc(rawOut.size());
        rawOut.forEach((byte, idx) => output[idx] = byte);

        return output;


    }

}