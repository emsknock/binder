import { ArrayList } from "structures/array-list";
import { Identifiable } from "types/identifiable";

interface BucketNode<K extends Identifiable, V> {
    key: K,
    value: V,
    next?: BucketNode<K, V>,
}

export class Bucket<K extends Identifiable, V> {

    private list = new ArrayList<{ key: K, value: V }>();

    public add(key: K, value: V) {
        this.list.add({ key, value });
    }

    private fetch(key: K) {
        return this.list.find(x => x.key.id === key.id);
    }

    public has(key: K) {
        return typeof this.fetch(key) !== "undefined";
    }

    public find(key: K) {

        const element = this.fetch(key);

        if (!element)
            throw Error(`No such key in bucket: ${key.id}`);

        return element;

    }

}