import { ArrayList } from "../../structures/array-list";
import { BufferReader } from "../../utils/buffer-reader";

export class LzwInflator {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new ArrayList<ArrayList<number>>();

    constructor(buffer: Buffer) {

        if (buffer.length < 1)
            throw Error("Cannot inflate empty buffer");

        this._inputBuffer = buffer;
        this._codebook.add(new ArrayList(1));

    }

    inflate() {

        const rawOut = new ArrayList<number>();
        const reader = new BufferReader(this._inputBuffer);

        do {

            const slice = reader.readUntil(s => s.size() === 2);

            const char = slice.popTail();
            const pref = slice.popTail();

            const part = new ArrayList<number>();
            part.concat(this._codebook.get(pref));
            part.add(char);

            rawOut.concat(part);
            this._codebook.add(part);

        } while(reader.bytesLeft() > 0);

        const output = Buffer.alloc(rawOut.size());
        rawOut.forEach((byte, idx) => output[idx] = byte);
        return output;

    }

}