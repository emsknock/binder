import { ArrayList } from "structures/array-list";

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

        let str = "";
        let idx = 1;
        for (const byte of this._inputBuffer) {

            str += String.fromCharCode(byte);

            if (this._codebook.has(str)) continue;
            
            this._codebook.set(str, idx);
            idx++;

        }

    }

}