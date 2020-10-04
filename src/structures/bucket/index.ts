import { Identifiable } from "types/identifiable";

interface BucketNode<K extends Identifiable, V> {
    key: K,
    value: V,
    next?: BucketNode<K, V>,
}

export class Bucket<K extends Identifiable, V> {

    private root: BucketNode<K, V> | null = null;
    private last: BucketNode<K, V> | null = null;

    public add(key: K, value: V) {
        const node: BucketNode<K, V> = { key, value };
        if (!this.root) {
            this.root = node;
            this.last = node;
        } else {
            this.last!.next = node;
        }
    }

    public find(key: K) {

        const idToFind = key.id();
        
        if (!this.root)
            throw Error(`Trying to find key from empty bucket: ${idToFind}`);

        let node = this.root;
        while (node.key.id() !== idToFind) {
            
            if(!node.next)
                throw Error(`No such key in bucket: ${idToFind}`);

            node = node.next;
            
        }

        return node;

    }

}