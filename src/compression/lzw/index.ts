import { ArrayList } from "../../structures/array-list";
import { Dictionary } from "../../structures/dictionary";

import { BufferReader } from "../../utils/buffer-reader";

export class LzwCompressor {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new Dictionary<number>();

    constructor(buffer: Buffer) {
        if (buffer.length < 1)
            throw Error("Cannot compress empty buffer");
        this._inputBuffer = buffer;
    }

    public compress() {

        const rawOut = new ArrayList<{ pref: number, byte: number }>();
        const reader = new BufferReader(this._inputBuffer);

        let code = 1;
        do {

            const slice = reader.readUntil(s => !this._codebook.has(s));
            const sCopy = slice.copy();

            const byte = sCopy.popTail();
            const pref = this._codebook.getSafe(sCopy, 0);

            this._codebook.set(slice, code++);

            rawOut.add({ pref, byte });

        } while (reader.bytesLeft() > 0);

        const output = Buffer.alloc(rawOut.size() * 2);
        rawOut.forEach(
            ({ pref, byte }, index) => {
                output.writeUInt8(pref, index * 2);
                output.writeUInt8(byte, index * 2 + 1);
            }
        );

        return output;

    }

}