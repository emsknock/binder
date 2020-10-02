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
    public readUntil = (predicate: (slice: string) => boolean) => {

        let str = "";
        let offset = 0;
        do {

            const readIndex = this.readHeadPosition + offset;

            if(readIndex >= this.buffer.length) return str;

            str += String.fromCharCode(this.buffer.readUInt8(readIndex));
            offset++;

        } while (!predicate(str));

        this.readHeadPosition += offset;

        return str;

    }

}