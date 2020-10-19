import { ArrayList } from "../../structures/array-list";
import { BufferReader } from "../../utils/buffer-reader";
import { byteToChar, charToByte } from "../../utils/bytes-chars";

export class LzwInflator {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new ArrayList<string>();

    constructor(buffer: Buffer) {

        if (buffer.length < 1)
            throw Error("Cannot inflate empty buffer");

        this._inputBuffer = buffer;
        this._codebook.add("");

    }

    inflate() {

        let rawOut = "";
        const reader = new BufferReader(this._inputBuffer);

        do {

            const slice = reader.readUntil(s => s.size() === 2);

            const char = slice.popTail();
            const pref = slice.popTail();

            const head = this._codebook.get(pref);
            const part = head + byteToChar(char);

            rawOut += part;
            this._codebook.add(part);

        } while(reader.bytesLeft() > 0);

        const output = Buffer.alloc(rawOut.length);
        [...rawOut].forEach((byte, idx) => output[idx] = charToByte(byte));
        return output;

    }

}