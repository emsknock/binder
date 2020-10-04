import { FixedArray } from "structures/fixed-array";
import { Bucket } from "structures/bucket";

import { Identifiable } from "types/identifiable";

export class Dictionary<K extends Identifiable, V> {

    private _buckets = new FixedArray<Bucket<K, V>>(256).map(() => new Bucket());

    private getBucket = (key: K) => this._buckets.get(key.id % 256);

    public set(key: K, value: V) {
        this.getBucket(key).add(key, value);
    }

    public has(key: K) {
        return typeof this.getBucket(key).find(key) !== "undefined";
    }

    public get(key: K) {
        const element = this.getBucket(key).find(key);
        if (!element)
            throw Error(`No such key in dictionary: ${key.id}`);
        return element.value;
    }

    public getSafe(key: K, defaultValue: V) {
        return this.getBucket(key).find(key) ?? defaultValue;
    }

}