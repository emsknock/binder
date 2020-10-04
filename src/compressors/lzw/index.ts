import { ArrayList } from "structures/array-list";
import { BufferReader } from "utils/buffer-reader";
import { charToByte } from "utils/bytes-chars";

export class LzwCompressor {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new Map<string, number>();

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

            const head = slice.slice(0, -1); // String without the last char
            const tail = slice.slice(-1); // The last char of string

            const pref = this._codebook.get(head) ?? 0;
            const byte = charToByte(tail);

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