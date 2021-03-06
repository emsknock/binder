import { ArrayList } from "../../structures/array-list";

/**
 * A utility to help with consuming buffer data.
 */
export class BufferReader {

    private readHeadPosition = 0;

    constructor(private readonly buffer: Buffer) { }

    public bytesLeft = () => this.buffer.length - this.readHeadPosition;

    /**
     * Reads the sequentially longer slices of the buffer and queries the predicate function with them.
     * When the predicate returns true for a slice, that slice is returned.
     * 
     * Should the slice to be tested reach the end of the buffer,
     * that slice will be returned regardless of the predicate
     * 
     * **Resumes from where it left off the next time it's called.**  
     * @param predicate A function to test slices
     */
    public readBytesUntil = (predicate: (slice: ArrayList<number>) => boolean) => {

        const output = new ArrayList<number>();

        let offset = 0;
        do {

            const readIndex = this.readHeadPosition + offset;
            if (readIndex >= this.buffer.length) break;
            
            output.add(this.buffer.readUInt8(readIndex));

            offset++;

        } while (!predicate(output));

        this.readHeadPosition += offset;

        return output;

    }

}