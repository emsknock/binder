import { BufferReader } from "utils/buffer-reader";
import { charToByte } from "utils/bytes-chars";

export class LzwInflator {

    /** A buffer object passed in the constructor */
    private readonly _inputBuffer: Buffer;

    private _codebook = new Map<number, string>();

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

            const slice = reader.readUntil(s => s.length === 2);

            const pref = slice.slice(0, 1);
            const char = slice.slice(1, 2);

            const prefCode = charToByte(pref);

            const head = this._codebook.has(prefCode) ? this._codebook.get(prefCode) : "";
            const part = head + char;

            rawOut += part;
            this._codebook.set(code++, part);

        } while(reader.bytesLeft() > 0);

        return rawOut;

    }

}