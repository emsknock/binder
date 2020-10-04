import { FixedArray } from "structures/fixed-array";
import { BufferReader } from "utils/buffer-reader";
import { byteToChar } from "utils/bytes-chars";

export class LzwInflator {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new FixedArray<string>(256, "");

    constructor(buffer: Buffer) {

        if (buffer.length < 1)
            throw Error("Cannot inflate empty buffer");

        this._inputBuffer = buffer;

    }

    inflate() {

        let rawOut = "";
        const reader = new BufferReader(this._inputBuffer);

        let code = 1;
        do {

            const slice = reader.readUntil(s => s.size() === 2);

            const char = slice.popTail();
            const pref = slice.popTail();

            const head = this._codebook.get(pref);
            const part = head + byteToChar(char);

            rawOut += part;
            this._codebook.set(code++, part);

        } while(reader.bytesLeft() > 0);

        return rawOut;

    }

}