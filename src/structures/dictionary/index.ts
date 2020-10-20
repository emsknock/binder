import { FixedArray } from "../fixed-array";
import { ArrayList } from "../array-list";
import { Bucket } from "../bucket";

type ByteList = ArrayList<number>;

export class Dictionary<V> {

    private _buckets = new FixedArray<Bucket<V>>(256).map(() => new Bucket<V>());

    private getBucket = (key: ByteList) => this._buckets.get(key.size() % 256);

    public set(key: ByteList, value: V) {
        this.getBucket(key).set(key, value);
    }

    public has(key: ByteList) {
        return typeof this.getBucket(key).find(key) !== "undefined";
    }

    public get(key: ByteList) {
        const element = this.getBucket(key).find(key);
        if (!element)
            throw Error("No such key in dictionary");
        return element.value;
    }

    public getSafe(key: ByteList, defaultValue: V) {
        return this.getBucket(key).find(key)?.value ?? defaultValue;
    }

}