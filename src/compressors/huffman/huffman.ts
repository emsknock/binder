import { FixedArray } from "structures/fixed-array";
import { PriorityQueue } from "structures/priority-queue";

export function huffman(buffer: Buffer) {

	const frequencyMap = new FixedArray(256, 0);
	buffer.forEach(
		(byte) => frequencyMap.changeWithFn(byte, count => count + 1)
	);

	const frequencyQueue = new PriorityQueue();
	frequencyMap.forEach(
		(frequency, byte) => frequencyQueue.push(byte, frequency)
	);

}